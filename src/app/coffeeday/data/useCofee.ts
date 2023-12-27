import { Collaborator } from "@/app/colaboradores/data/useCollaborators"
import { api } from "@/service/api"
import { useState } from "react"

export interface ItemBody {
  name: string,
  missing: boolean,
  collaboratorId: number,
}
export interface Item {
    id: number,
    name: string,
    missing: boolean,
    collaboratorId: number,
    breakfastId: number
}

export interface Coffee {
    id: number,
    date: Array<number>,
    collaborators: Array<Collaborator>,
    items: Array<Item>
}



  export const useCoffees = () => {

    const [Coffees, setCoffees] = useState<Coffee[]>([])

    const formatInputDate = (dateArray: Array<number>): string => {
      const [year, month, day] = dateArray;
    
      // Adiciona zero à esquerda para garantir dois dígitos
      const formattedDay = day.toString().padStart(2, '0');
      // Adiciona um à zero para ajustar ao mês (janeiro é 0 em JavaScript)
      const formattedMonth = (month + 1).toString().padStart(2, '0');
    
      // Formata a data no formato aaaa-mm-dd
      const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    
      return formattedDate;
    };

    const parseInputDate = (formattedDate: string) => {
      const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
      const match = formattedDate.match(dateRegex);
    
      if (match) {
        const [, year, month, day] = match.map(Number);
        return [year, month - 1, day]; // Reduz 1 do mês para ajustar (janeiro é 0 em JavaScript)
      }
    
      return null;
    };
    
    const loadCoffees = async () => {
      try {
        const { data } = await api.get('/breakfast')

        setCoffees(data)
      }catch (err) {

        console.log(err)
      }
    }

    const createCoffee = async (date: string, items: Array<ItemBody>) => {
      try {
        await api.post('/breakfast', {
          date,
          items: items
        })

        await loadCoffees();

      } catch (error: any) {
        throw new Error(error.response.data.errors[0].error)
      }
    }

    const deleteCoffee = async (id: number) => {
      try {
        await api.delete(`/breakfast/${id}`)

        await loadCoffees()
      
      }catch (error: any) {
        throw new Error(error.response.data)
      }
    }

    const updateCoffee = async (id: number, date: string, items: Array<ItemBody>) => {
      try {
        await api.put(`/breakfast/${id}`, {
          date,
          items: items
        })

        await loadCoffees()

      } catch (error : any) {
        throw new Error(error.response.data.errors[0].error)
      }
    }


    return { loadCoffees, Coffees, createCoffee,deleteCoffee, updateCoffee, formatInputDate, parseInputDate }
  }