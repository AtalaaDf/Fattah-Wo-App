import { useDashboardStats } from '../../features/schedule/hooks/useDashboardStats'
import DashboardHeaderSection from './sections/DashboardHeaderSection'
import DashboardStatsSection from './sections/DashboardStatsSection'
import UpcomingEventsSection from './sections/UpcomingEventsSection'

export const AdminDashboardPage = () => {
  const { data: stats, isLoading } = useDashboardStats()
  const upcoming = stats?.upcomingEvents || []

  return (
    <div className="space-y-6">
      <DashboardHeaderSection />
      <DashboardStatsSection stats={stats} isLoading={isLoading} />
      <UpcomingEventsSection upcoming={upcoming} isLoading={isLoading} />
    </div>
  )
}

export default AdminDashboardPage
