export const areaChartData = [
  { name: '04-19', reports: 10, resolutions: 5 },
  { name: '04-20', reports: 20, resolutions: 15 },
  { name: '04-21', reports: 30, resolutions: 20 },
  { name: '04-22', reports: 15, resolutions: 10 },
  { name: '04-23', reports: 8,  resolutions: 15 },
  { name: '04-24', reports: 12, resolutions: 8 },
  { name: '04-25', reports: 25, resolutions: 12 },
  { name: '04-26', reports: 18, resolutions: 20 },
  { name: '04-27', reports: 22, resolutions: 18 },
  { name: '04-28', reports: 14, resolutions: 10 },
  { name: '04-29', reports: 6,  resolutions: 5 },
  { name: '04-30', reports: 12, resolutions: 8 },
  { name: '05-01', reports: 5,  resolutions: 2 },
  { name: '05-02', reports: 2,  resolutions: 0 },
];

export const statusData = [
  { name: 'Reported', value: 5, color: '#3B82F6' }, // Primary
  { name: 'In Progress', value: 9, color: '#F59E0B' }, // Warning
  { name: 'Resolved', value: 8, color: '#EF4444' }, // Danger (using original UI colors roughly, wait, standard is Resolved=Success)
];

export const hazardTypeData = [
  { name: 'Pothole', value: 8, fill: '#F59E0B' },
  { name: 'Debris', value: 5, fill: '#6B7280' },
  { name: 'Flooding', value: 5, fill: '#3B82F6' },
  { name: 'Broken Light', value: 5, fill: '#0EA5E9' },
  { name: 'Damaged Signage', value: 4, fill: '#1E40AF' },
  { name: 'Construction', value: 4, fill: '#D97706' },
  { name: 'Other', value: 4, fill: '#4B5563' },
  { name: 'Ice / Snow', value: 0, fill: '#E5E7EB' },
];

export const hotspotData = [
  { id: 1, name: 'Camden', count: 7, max: 10, date: '19/04/12' },
  { id: 2, name: 'Islington', count: 6, max: 10, date: '19/04/18' },
  { id: 3, name: 'Hackney', count: 5, max: 10, date: '19/04/12' },
  { id: 4, name: 'Southwark', count: 5, max: 10, date: '20/04/19' },
  { id: 5, name: 'Westminster', count: 4, max: 10, date: '19/04/12' },
  { id: 6, name: 'Tower Hamlets', count: 3, max: 10, date: '19/04/11' },
];

export const recentActivity = [
  {
    id: 'HZ-1083',
    title: 'Street light out for days',
    location: 'Hackney',
    time: '4d ago',
    status: 'RESOLVED',
    severity: 'CRITICAL',
    type: 'light',
  },
  {
    id: 'HZ-1082',
    title: 'Loose manhole cover',
    location: 'Tower Hamlets',
    time: '3d ago',
    status: 'REPORTED',
    severity: 'MEDIUM',
    type: 'infrastructure',
  },
  {
    id: 'HZ-1089',
    title: 'Unmarked construction zone',
    location: 'Islington',
    time: '3d ago',
    status: 'IN PROGRESS',
    severity: 'CRITICAL',
    type: 'construction',
  },
  {
    id: 'HZ-1030',
    title: 'Severe flooding after rain',
    location: 'Islington',
    time: '4d ago',
    status: 'IN PROGRESS',
    severity: 'HIGH',
    type: 'flood',
  },
  {
    id: 'HZ-1012',
    title: 'Open manhole left uncovered',
    location: 'Hackney',
    time: '7d ago',
    status: 'IN PROGRESS',
    severity: 'LOW',
    type: 'infrastructure',
  },
];
