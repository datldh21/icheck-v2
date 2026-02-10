import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import { mockSettings, mockDepartments } from '../mocks';
import { mockUsers } from '../mocks';
import { holidayService } from '../services';
import type { Holiday, Setting, User, Department } from '../types';
import { Avatar, Badge } from '../components/common';

type Tab = 'ip' | 'holidays' | 'users' | 'departments';

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('ip');

  const tabs: { key: Tab; label: string }[] = [
    { key: 'ip', label: 'IP Whitelist' },
    { key: 'holidays', label: 'Ngày lễ' },
    { key: 'users', label: 'Nhân viên' },
    { key: 'departments', label: 'Phòng ban' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Cài đặt hệ thống</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab.key
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'ip' && <IPWhitelistTab />}
      {activeTab === 'holidays' && <HolidaysTab />}
      {activeTab === 'users' && <UsersTab />}
      {activeTab === 'departments' && <DepartmentsTab />}
    </div>
  );
}

// ===== IP Whitelist Tab =====
function IPWhitelistTab() {
  const [settings, setSettings] = useState<Setting[]>(mockSettings.filter((s) => s.configKey.startsWith('COMPANY_IP')));
  const [newIp, setNewIp] = useState('');

  const handleAdd = () => {
    if (!newIp.trim()) return;
    const newSetting: Setting = {
      id: `s-${Date.now()}`,
      configKey: `COMPANY_IP_${settings.length + 1}`,
      configValue: newIp.trim(),
    };
    setSettings([...settings, newSetting]);
    setNewIp('');
  };

  const handleDelete = (id: string) => {
    setSettings(settings.filter((s) => s.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-5 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-800">Danh sách IP được phép</h3>
        <p className="text-xs text-gray-400 mt-1">Quản lý danh sách IP công ty cho chấm công</p>
      </div>

      {/* Add new IP */}
      <div className="px-5 py-4 border-b border-gray-50 flex gap-3">
        <input
          type="text"
          value={newIp}
          onChange={(e) => setNewIp(e.target.value)}
          placeholder="Nhập địa chỉ IP (vd: 113.161.72.100)"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors"
        >
          <Plus size={16} />
          Thêm
        </button>
      </div>

      {/* IP List */}
      <div className="divide-y divide-gray-50">
        {settings.map((setting) => (
          <div key={setting.id} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50/50">
            <div>
              <p className="text-sm font-mono font-semibold text-gray-800">{setting.configValue}</p>
              <p className="text-xs text-gray-400">{setting.configKey}</p>
            </div>
            <button
              onClick={() => handleDelete(setting.id)}
              className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== Holidays Tab =====
function HolidaysTab() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ date: '', name: '', isPaid: true });
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ date: '', name: '', isPaid: true });

  useEffect(() => {
    holidayService.getAll().then(setHolidays);
  }, []);

  const handleAdd = async () => {
    if (!addForm.date || !addForm.name) return;
    const h = await holidayService.create(addForm);
    setHolidays([...holidays, h]);
    setAddForm({ date: '', name: '', isPaid: true });
    setShowAdd(false);
  };

  const handleDelete = async (id: string) => {
    await holidayService.remove(id);
    setHolidays(holidays.filter((h) => h.id !== id));
  };

  const startEdit = (h: Holiday) => {
    setEditingId(h.id);
    setEditForm({ date: h.date, name: h.name, isPaid: h.isPaid });
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    const updated = await holidayService.update(editingId, editForm);
    setHolidays(holidays.map((h) => (h.id === editingId ? updated : h)));
    setEditingId(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Lịch ngày lễ</h3>
          <p className="text-xs text-gray-400 mt-1">Quản lý ngày lễ và nghỉ của công ty</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors"
        >
          <Plus size={16} />
          Thêm ngày lễ
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">Ngày</label>
            <input
              type="date"
              value={addForm.date}
              onChange={(e) => setAddForm({ ...addForm, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">Tên ngày lễ</label>
            <input
              type="text"
              value={addForm.name}
              onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
              placeholder="VD: Tết Nguyên đán"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 text-sm">
              <input
                type="checkbox"
                checked={addForm.isPaid}
                onChange={(e) => setAddForm({ ...addForm, isPaid: e.target.checked })}
                className="rounded"
              />
              Có lương
            </label>
          </div>
          <button onClick={handleAdd} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            <Save size={16} />
          </button>
          <button onClick={() => setShowAdd(false)} className="p-2 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400">Ngày</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400">Tên ngày lễ</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400">Có lương</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {holidays.map((h) => (
              <tr key={h.id} className="hover:bg-gray-50/50">
                {editingId === h.id ? (
                  <>
                    <td className="px-5 py-3">
                      <input type="date" value={editForm.date} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} className="px-2 py-1 border rounded text-sm" />
                    </td>
                    <td className="px-5 py-3">
                      <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="px-2 py-1 border rounded text-sm" />
                    </td>
                    <td className="px-5 py-3">
                      <input type="checkbox" checked={editForm.isPaid} onChange={(e) => setEditForm({ ...editForm, isPaid: e.target.checked })} />
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex gap-1 justify-end">
                        <button onClick={handleSaveEdit} className="p-1.5 text-green-600 hover:bg-green-50 rounded"><Save size={14} /></button>
                        <button onClick={() => setEditingId(null)} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded"><X size={14} /></button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-5 py-3 font-medium text-gray-700">{h.date}</td>
                    <td className="px-5 py-3 text-gray-700">{h.name}</td>
                    <td className="px-5 py-3">
                      <Badge variant={h.isPaid ? 'approved' : 'rejected'}>
                        {h.isPaid ? 'Có lương' : 'Không lương'}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex gap-1 justify-end">
                        <button onClick={() => startEdit(h)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded"><Edit2 size={14} /></button>
                        <button onClick={() => handleDelete(h.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ===== Users Tab =====
function UsersTab() {
  const users: User[] = mockUsers;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-5 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-800">Quản lý nhân viên</h3>
        <p className="text-xs text-gray-400 mt-1">Danh sách nhân viên trong hệ thống</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400">Nhân viên</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400">Email</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400">Phòng ban</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400">Role</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400">Ngày phép còn</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50/50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={u.name} size="sm" />
                    <span className="font-medium text-gray-800">{u.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-gray-500">{u.email}</td>
                <td className="px-5 py-3 text-gray-600">{u.departmentName}</td>
                <td className="px-5 py-3">
                  <Badge variant={u.role === 'admin' ? 'rejected' : u.role === 'manager' ? 'pending' : 'approved'}>
                    {u.role}
                  </Badge>
                </td>
                <td className="px-5 py-3 font-semibold text-gray-700">{u.annualLeaveRemaining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ===== Departments Tab =====
function DepartmentsTab() {
  const departments: Department[] = mockDepartments;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Quản lý phòng ban</h3>
          <p className="text-xs text-gray-400 mt-1">Cấu trúc phòng ban của công ty</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400">ID</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400">Tên phòng ban</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400">Trưởng phòng</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400">Số nhân viên</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {departments.map((dept) => {
              const manager = mockUsers.find((u) => u.id === dept.managerId);
              const memberCount = mockUsers.filter((u) => u.departmentId === dept.id).length;
              return (
                <tr key={dept.id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-3 text-gray-400 font-mono text-xs">{dept.id}</td>
                  <td className="px-5 py-3 font-semibold text-gray-800">{dept.name}</td>
                  <td className="px-5 py-3">
                    {manager ? (
                      <div className="flex items-center gap-2">
                        <Avatar name={manager.name} size="sm" />
                        <span className="text-gray-700">{manager.name}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-5 py-3 font-semibold text-gray-700">{memberCount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
