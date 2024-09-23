import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, Formik } from "formik";
import * as yup from "yup";

// Definir esquema de validación con Yup
const validationSchema = yup.object().shape({
    firstName: yup.string().required("Este campo es requerido"),
    lastName: yup.string().required("Este campo es requerido"),
    email: yup.string().email("Correo inválido").required("Este campo es requerido"),
    phone: yup.string().required("Este campo es requerido"),
    state: yup.string().required("Este campo es requerido"),
    source: yup.string().required("Este campo es requerido"),
    comments: yup.string().required("Este campo es requerido"),
});

export const ContactForm3 = () => {
    return (
        <Formik
            initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                state: "",
                source: "",
                comments: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                await fetch(
                    "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00Do0000000b6Io",
                    {
                        method: "POST",
                        body: new URLSearchParams({
                            oid: "00Do0000000b6Io",
                            retURL: "https://www.javer.com.mx/gracias",
                            first_name: values.firstName,
                            last_name: values.lastName,
                            email: values.email,
                            phone: values.phone,
                            state: values.state,
                            "00N3l00000Q7A57": values.source, // Campo fuente
                            "00N3l00000Q7A4r": values.comments, // Campo comentarios
                        }),
                    }
                ).then(() => {
                    window.location.href = "https://www.javer.com.mx/gracias";
                }).catch((error) => console.log(error));
            }}
        >
            {({ getFieldProps, handleSubmit, errors, touched }) => (
                <Form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Input
                            {...getFieldProps("firstName")}
                            placeholder="Nombre"
                            className="bg-white h-12"
                        />
                        {errors.firstName && touched.firstName && <div className="text-red-500">{errors.firstName}</div>}
                    </div>

                    <div>
                        <Input
                            {...getFieldProps("lastName")}
                            placeholder="Apellido"
                            className="bg-white h-12"
                        />
                        {errors.lastName && touched.lastName && <div className="text-red-500">{errors.lastName}</div>}
                    </div>

                    <div>
                        <Input
                            {...getFieldProps("email")}
                            placeholder="Correo electrónico"
                            className="bg-white h-12"
                        />
                        {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
                    </div>

                    <div>
                        <Input
                            {...getFieldProps("phone")}
                            placeholder="Teléfono"
                            className="bg-white h-12"
                        />
                        {errors.phone && touched.phone && <div className="text-red-500">{errors.phone}</div>}
                    </div>

                    <div>
                        <Select
                            onValueChange={(value) => getFieldProps("state").onChange({ target: { value, name: "state" } })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona estado" />
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
                        {errors.state && touched.state && <div className="text-red-500">{errors.state}</div>}
                    </div>

                    <div>
                        <Select
                            onValueChange={(value) => getFieldProps("source").onChange({ target: { value, name: "source" } })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona fuente" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Landing_Fovissste">Landing Fovissste</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.source && touched.source && <div className="text-red-500">{errors.source}</div>}
                    </div>

                    <div>
                        <Textarea
                            {...getFieldProps("comments")}
                            placeholder="Escribe un mensaje"
                            className="bg-white"
                        />
                        {errors.comments && touched.comments && <div className="text-red-500">{errors.comments}</div>}
                    </div>

                    <div>
                        <Button type="submit" className="w-full bg-blue-600 text-white h-12">
                            Enviar
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default ContactForm3;
