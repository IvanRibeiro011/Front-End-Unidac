import { PageDescription } from "@/components";

export default function ItemsPage() {
  return  (
    <>
      <PageDescription  title='Items' description='lista de items cadastrados' />
      <table className='w-full mt-4'>
          <thead className='border-b-[1px] text-left'>
            <th>Id</th>
            <th>Item</th>
          </thead>
          <tbody className='text-left'>
            <tr>
              <td>1</td>
              <td>Chocolate</td>
              <td className='flex gap-4'>
                <button className='bg-purple-700 p-2 rounded-full text-white font-bold'>editar</button>
                <button className='bg-red-500 p-2 rounded-full text-white font-bold'>deletar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </>
  )
}