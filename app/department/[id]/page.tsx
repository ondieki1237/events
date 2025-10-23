import DepartmentClient from '@/components/department-client'

export default async function DepartmentPage({ params }: { params: { id: string } }) {
  // unwrap params safely in a Server Component
  const p = await params
  const deptId = Number.parseInt(p.id)

  return <DepartmentClient deptId={deptId} />
}