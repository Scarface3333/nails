import { AllAppointmentsAdmin } from "@/components/AllApp"
import CreateMasterForm from "@/components/createMasterForm"
import MasterList from "@/components/masters"

export const Admin = () => {
  return (
    <>
      <CreateMasterForm />
      <MasterList />
      <AllAppointmentsAdmin />
    </>
  )
}