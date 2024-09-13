import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from './ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
    name: z.string().min(4, {
        message: "El nombre debe tener al menos 4 caracteres",
    }),
    email: z.string().email({
        message: "Debe ser un correo electrónico válido",
    }),
    phone: z.string().min(10, {
        message: "El número de teléfono debe tener al menos 10 dígitos",
    }).max(15, {
        message: "El número de teléfono no debe exceder los 15 dígitos",
    }).regex(/^\d+$/, {
        message: "El número de teléfono solo puede contener dígitos",
    }),
    state: z.enum([
        "Nuevo_Leon",
        "Aguascalientes",
        "Estado_Mexico",
        "Jalisco",
        "Puebla",
        "Querétaro",
        "Quintana_Roo",
        "Tamaulipas"
    ], {
        message: "Debe seleccionar un estado válido",
    }),
});

function Formulario() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            state: undefined,  // Inicializa el estado sin valor
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                {/* Campo para el nombre */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="text-gray-500 btn_form">
                            <FormControl>
                                <Input className="bg-white h-12" placeholder="Nombre completo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Campo para el correo */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="text-gray-500 btn_form">
                            <FormControl>
                                <Input className="bg-white h-12" placeholder="Correo electrónico" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Campo para el teléfono */}
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem className="text-gray-500 btn_form">
                            <FormControl>
                                <Input className="bg-white h-12" placeholder="Teléfono" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Select para seleccionar estado */}
                <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                        <FormItem className="text-gray-500 btn_form">
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger aria-label="Selecciona un estado" className="bg-white h-12">
                                        <SelectValue placeholder="Selecciona estado de interés" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Nuevo_Leon">Nuevo León</SelectItem>
                                        <SelectItem value="Aguascalientes">Aguascalientes</SelectItem>
                                        <SelectItem value="Estado_Mexico">Estado de México</SelectItem>
                                        <SelectItem value="Jalisco">Jalisco</SelectItem>
                                        <SelectItem value="Puebla">Puebla</SelectItem>
                                        <SelectItem value="Querétaro">Querétaro</SelectItem>
                                        <SelectItem value="Quintana_Roo">Quintana Roo</SelectItem>
                                        <SelectItem value="Tamaulipas">Tamaulipas</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Botón de envío */}
                <Button
                    className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 h-15"
                    type="submit"
                >
                    Solicitar información
                    <svg
                        className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                </Button>

            </form>
        </Form>
    )
}

export default Formulario
