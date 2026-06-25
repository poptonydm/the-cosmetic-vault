import { useState } from 'react';
import { Search, RefreshCw, Mail, Phone, Calendar, Clock, CheckCircle2, XCircle, X, User, Hash, MessageSquare, FileText, DollarSign, Sparkles, Scissors } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const APPOINTMENT_STATUS_GROUPS = {
  all: { label: 'All', icon: Calendar },
  pending: { label: 'Pending', icon: Clock },
  finished: { label: 'Finished', icon: CheckCircle2 },
  in_progress: { label: 'In Progress', icon: Sparkles },
  cancelled: { label: 'Cancelled', icon: XCircle },
};

const StatusBadge = ({ status }) => {
  const config = {
    pending: { bg: 'bg-amber-500/20', text: 'text-amber-600 dark:text-amber-400', label: 'Pending' },
    finished: { bg: 'bg-green-500/20', text: 'text-green-600 dark:text-green-400', label: 'Finished' },
    in_progress: { bg: 'bg-indigo-500/20', text: 'text-indigo-600 dark:text-indigo-400', label: 'In Progress' },
    cancelled: { bg: 'bg-red-500/20', text: 'text-red-600 dark:text-red-400', label: 'Cancelled' },
  };
  const { bg, text, label } = config[status] || config.pending;
  return <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${bg} ${text}`}>{label}</span>;
};

export default function Appointments({ appointments, updateAppointmentStatus }) {
  const [appointmentSearch, setAppointmentSearch] = useState('');
  const [appointmentStatusFilter, setAppointmentStatusFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const refreshAppointments = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  };

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    await updateAppointmentStatus(appointmentId, newStatus);
    if (selectedAppointment?._id === appointmentId) {
      setSelectedAppointment(prev => ({...prev, status: newStatus }));
    }
  };

  const filteredAppointments = appointments.filter(app => {
    const matchesStatus = appointmentStatusFilter === 'all' || app.status === appointmentStatusFilter;
    const matchesSearch =
      app.clientName.toLowerCase().includes(appointmentSearch.toLowerCase()) ||
      app.email.toLowerCase().includes(appointmentSearch.toLowerCase()) ||
      app.serviceName.toLowerCase().includes(appointmentSearch.toLowerCase()) ||
      app.appointmentId?.toLowerCase().includes(appointmentSearch.toLowerCase()) ||
      app._id.toLowerCase().includes(appointmentSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusCounts = {
    all: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    finished: appointments.filter(a => a.status === 'finished').length,
    in_progress: appointments.filter(a => a.status === 'in_progress').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">All Appointments</h2>
        <div className="flex gap-2">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={appointmentSearch}
              onChange={(e) => setAppointmentSearch(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 bg-white py-2 pl-10 pr-4 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            />
          </div>
          <button
            onClick={refreshAppointments}
            disabled={refreshing}
            className="flex shrink-0 items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-bold text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b border-zinc-200 dark:border-zinc-800">
        {Object.entries(APPOINTMENT_STATUS_GROUPS).map(([key, group]) => {
          const Icon = group.icon;
          const count = statusCounts[key] || 0;
          const isActive = appointmentStatusFilter === key;

          return (
            <button
              key={key}
              onClick={() => setAppointmentStatusFilter(key)}
              className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-bold transition ${
                isActive
          ? 'border-rose-500 text-rose-500'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              {group.label}
              <span className={`rounded-full px-2 py-0.5 text-xs ${
                isActive
          ? 'bg-rose-500 text-white'
                  : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="sticky top-0 z-10 border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/50">
              <tr>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Customer</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Contact</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Service</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Price</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Date & Time</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Note</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Status</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
              <AnimatePresence>
                {filteredAppointments.map((appointment, idx) => {

                  return (
                    <motion.tr
                      key={appointment._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: idx * 0.02 }}
                      onClick={() => setSelectedAppointment(appointment)}
                      className="group cursor-pointer transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30"
                    >
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                            {appointment.clientName}
                          </span>
                          <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                            {appointment.appointmentId || appointment._id.slice(-8).toUpperCase()}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col gap-0.5">
                          <a
                            href={`mailto:${appointment.email}`}
                            className="text-xs text-zinc-600 hover:text-rose-500 dark:text-zinc-400 dark:hover:text-rose-400"
                          >
                            {appointment.email}
                          </a>
                          <a
                            href={`tel:${appointment.phone}`}
                            className="text-[11px] text-zinc-500 hover:text-rose-500 dark:text-zinc-400 dark:hover:text-rose-400"
                          >
                            {appointment.phone}
                          </a>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                          {appointment.serviceName}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-lg font-black text-rose-500">
                          ₵{appointment.total?.toLocaleString()}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                            {new Date(appointment.date).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                            {appointment.time}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 max-w-[200px]">
                        <p className="text-sm text-zinc-700 dark:text-zinc-300 line-clamp-2">
                          {appointment.note || '—'}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={appointment.status} />
                      </td>

                      <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={appointment.status}
                          onChange={(e) => handleStatusUpdate(appointment._id, e.target.value)}
                          className="w-full rounded-lg border border-zinc-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-zinc-700 transition hover:border-zinc-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600"
                        >
                          <option value="pending">Pending</option>
                          <option value="finished">Finished</option>
                          <option value="in_progress">In Progress</option>
                          <option value="cancelled">Cancel</option>
                        </select>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
          {filteredAppointments.length === 0 && (
            <div className="py-20 text-center">
              <Calendar className="mx-auto mb-3 h-12 w-12 text-zinc-300 dark:text-zinc-700" />
              <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                No appointments found
              </p>
              {appointmentSearch && (
                <button
                  onClick={() => { setAppointmentSearch(''); setAppointmentStatusFilter('all'); }}
                  className="mt-3 text-sm text-rose-500 hover:text-rose-600"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedAppointment && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAppointment(null)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10">
                    <FileText className="h-5 w-5 text-rose-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      Appointment Details
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {selectedAppointment.appointmentId || selectedAppointment._id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-[70vh] overflow-y-auto p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <StatusBadge status={selectedAppointment.status} />
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {new Date(selectedAppointment.createdAt).toLocaleString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
                      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        <User className="h-3.5 w-3.5" />
                        Customer
                      </div>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                        {selectedAppointment.clientName}
                      </p>
                    </div>

                    <div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
                      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        <Scissors className="h-3.5 w-3.5" />
                        Stylist
                      </div>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                        {selectedAppointment.stylist || 'Not assigned'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50">
                      <Mail className="h-4 w-4 text-rose-500" />
                      <div className="flex-1">
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Email</p>
                        <a
                          href={`mailto:${selectedAppointment.email}`}
                          className="text-sm font-medium text-zinc-900 hover:text-rose-500 dark:text-white dark:hover:text-rose-400"
                        >
                          {selectedAppointment.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50">
                      <Phone className="h-4 w-4 text-rose-500" />
                      <div className="flex-1">
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Phone</p>
                        <a
                          href={`tel:${selectedAppointment.phone}`}
                          className="text-sm font-medium text-zinc-900 hover:text-rose-500 dark:text-white dark:hover:text-rose-400"
                        >
                          {selectedAppointment.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
                      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        <Sparkles className="h-3.5 w-3.5" />
                        Service
                      </div>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                        {selectedAppointment.serviceName}
                      </p>
                    </div>

                    <div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
                      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        <DollarSign className="h-3.5 w-3.5" />
                        Price
                      </div>
                      <p className="text-lg font-black text-rose-500">
                        ₵{selectedAppointment.total?.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
                      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        <Calendar className="h-3.5 w-3.5" />
                        Date
                      </div>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                        {new Date(selectedAppointment.date).toLocaleDateString('en-GB', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>

                    <div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
                      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        <Clock className="h-3.5 w-3.5" />
                        Time
                      </div>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                       {selectedAppointment.time}
                      </p>
                    </div>
                  </div>

                  {selectedAppointment.note && (
                    <div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
                      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        <MessageSquare className="h-3.5 w-3.5" />
                        Note
                      </div>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                        {selectedAppointment.note}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                <div className="flex gap-2">
                  {selectedAppointment.status === 'pending' && (
                    <button
                      onClick={() => handleStatusUpdate(selectedAppointment._id, 'confirmed')}
                      className="flex-1 rounded-lg bg-green-500 py-2.5 text-sm font-bold text-white transition hover:bg-green-600"
                    >
                      Confirm Appointment
                    </button>
                  )}
                  {selectedAppointment.status === 'confirmed' && (
                    <button
                      onClick={() => handleStatusUpdate(selectedAppointment._id, 'in_progress')}
                      className="flex-1 rounded-lg bg-indigo-500 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-600"
                    >
                      Start Service
                    </button>
                  )}
                  {selectedAppointment.status!== 'cancelled' && (
                    <button
                      onClick={() => handleStatusUpdate(selectedAppointment._id, 'cancelled')}
                      className="flex-1 rounded-lg bg-red-500 py-2.5 text-sm font-bold text-white transition hover:bg-red-600"
                    >
                      Cancel Appointment
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
