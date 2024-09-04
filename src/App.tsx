"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
// import { useState } from 'react'
import './App.css'
import { ThemeProvider } from './components/theme-provider'
// import { ModeToggle } from './components/mode-toggle'
import logo from './assets/logo.svg'
import { Button } from './components/ui/button'
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ModeToggle } from "./components/mode-toggle"
import foviste from './assets/foviste-gob.jpg'




const formSchema = z.object({
  name: z.string().min(4, {
    message: "El nombre debe tener al menos 4 carácteres",
  }),
})

function App() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  // const [count, setCount] = useState(0)

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='justify-center flex flex-row pt-4'>
        <img className="d" width={200} src={logo} alt="Logo" />

      </div>
      <div className='justify-center flex flex-row py-4'>
        <ModeToggle />
      </div>
      {/* <div className="card">
        <Button variant={'secondary'} onClick={() => setCount((count) => count + 1)}>Click me {count} </Button>
      </div> */}



      <section className="bg-slate-100 dark:bg-slate-900 ">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-12">
            <div className=" text-white ">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl  text-gray-900 mb-4 dark:text-gray-300  ">
                Crédito Fovissste
              </h1>
              <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Todo lo que necesitas saber sobre en nuevo esquema crediticio "FOVISSSTE para Todos" está en este vídeo. ¡Compartelo!</p>
              {/* <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0">
              <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Contacto
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
              <a href="#" className="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Más información
              </a>
            </div> */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input className="bg-white" placeholder="Nombre completo" {...field} />
                        </FormControl>
                        <FormControl>
                          <Input className="bg-white" placeholder="Correo electrónico" {...field} />
                        </FormControl>
                        <FormControl>
                          <Input className="bg-white" placeholder="Teléfono" {...field} />
                        </FormControl>
                        <FormControl>
                          <Textarea
                            placeholder="Escribe tu mensaje"
                            className="resize-none bg-white"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Solicitar información                 <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg></Button>
                </form>
              </Form>


            </div>
            <div className=" text-white ">
              <iframe className="mx-auto w-full lg:max-w-xl h-64 rounded-lg sm:h-96 shadow-xl" src="https://www.youtube.com/embed/vri5jwbG7xo?si=wYvjmcl35JM-nDYC" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>

            </div>
          </div>
        </div>

      </section>

      <section className=" container mx-auto p-4 py-8 pt-12">
        <p className="text-gray-400">
          <span className="font-bold">El FOVISSSTE (Fondo de la Vivienda del Instituto de Seguridad y Servicios Sociales de los Trabajadores del Estado)</span> es una entidad mexicana que forma parte del ISSSTE (Instituto de Seguridad y Servicios Sociales de los Trabajadores del Estado). Su principal objetivo es ofrecer créditos hipotecarios a los trabajadores del sector público para la adquisición, construcción, ampliación, reparación o mejora de viviendas.
        </p>


      </section>

      <section className="mb-10">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div >
              <h2 className=" text-gray-900 dark:text-gray-300 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 my-5 ">
                Tipos de Créditos del FOVISSSTE
              </h2>

              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li><span className="font-bold">Crédito Tradicional:</span> Es el crédito hipotecario más común, otorgado mediante un sorteo anual. Permite la adquisición de una vivienda nueva o usada, la construcción en terreno propio o la reparación y ampliación de la vivienda.</li>
                <li><span className="font-bold">Crédito Conyugal FOVISSSTE-Infonavit:</span> Permite a un trabajador del sector público y su pareja (que esté afiliada al Infonavit) sumar sus créditos para la adquisición de una vivienda.</li>
                <li><span className="font-bold">Pensionados:</span> Un crédito especial para pensionados que no alcanzaron a ejercer su crédito durante su vida laboral activa.</li>
                <li><span className="font-bold">FOVISSSTE en Pesos:</span> Un crédito hipotecario con tasa fija en pesos, diferente al crédito tradicional en UMAs.</li>
              </ul>
            </div>
            <div className=" text-white ">
              <img className="d" width={800} src={foviste} alt="foviste" />

            </div>
          </div>
        </div>

      </section>

      <section className="bg-slate-100 dark:bg-slate-900 flex items-center justify-center min-h-screen p-4 py-14">
        <div className="w-full max-w-lg bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">
            Solicita información
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400 text-center">
            Completa el siguiente formulario para ponerte en contacto con nosotros.
          </p>
          {/* Aquí va el formulario */}
          <form>
            <div className="space-y-4">
              {/* Ejemplo de un campo de entrada */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Nombre</label>
                <input
                  type="text"
                  placeholder="Ingresa tu nombre"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 dark:text-white"
                />
              </div>
              {/* Añadir más campos según sea necesario */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Correo electrónico</label>
                <input
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white bg-white"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Mensaje</label>
                <textarea
                  placeholder="Escribe tu mensaje"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white bg-white"
                  rows={4}
                ></textarea>
              </div>
            </div>
            <button type="submit" className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
              Enviar
            </button>
          </form>
        </div>
      </section>


    </ThemeProvider >
  )
}

export default App
