import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, Formik } from "formik";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";

// Definir esquema de validación con Yup
const validationSchema = yup.object().shape({
    firstName: yup.string().required("Este campo es requerido"),
    lastName: yup.string().required("Este campo es requerido"),
    email: yup.string().email("Correo inválido").required("Este campo es requerido"),
    phone: yup.string().required("Este campo es requerido"),
    state: yup.string().required("Este campo es requerido"),
    comments: yup.string().required("Este campo es requerido"),
    recaptcha: yup.string().required("Este campo es requerido"),
});

export const InfonavitForm = () => {
    return (
        <Formik
            initialValues={{
                firstName: "",
                // lastName: "",
                email: "",
                phone: "",
                state: "",
                source: "Landing_Fovissste", // Valor por defecto
                comments: "",
                recaptcha: undefined as string | undefined,
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
                            // last_name: values.lastName,
                            email: values.email,
                            phone: values.phone,
                            state: values.state,
                            "g-recaptcha-response": values.recaptcha ?? "",
                            "00N3l00000Q7A57": values.source, // Campo fuente
                            "00N3l00000Q7A4r": values.comments,// Campo comentarios
                        }),
                    }
                ).then(() => {
                    window.location.href = "https://www.javer.com.mx/gracias";
                }).catch((error) => console.log(error));
            }}
        >
            {({ getFieldProps, setFieldValue, handleSubmit, errors, touched }) => (
                <Form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Input
                            {...getFieldProps("firstName")}
                            placeholder="Nombre"
                            className="bg-white h-12 text-gray-500 "
                        />
                        {errors.firstName && touched.firstName && <div className="text-red-500">{errors.firstName}</div>}
                    </div>

                    {/* <div>
                        <Input
                            {...getFieldProps("lastName")}
                            placeholder="Apellido"
                            className="bg-white h-12 text-gray-500"
                        />
                        {errors.lastName && touched.lastName && <div className="text-red-500">{errors.lastName}</div>}
                    </div> */}

                    <div>
                        <Input
                            {...getFieldProps("email")}
                            placeholder="Correo electrónico"
                            className="bg-white h-12 text-gray-500"
                        />
                        {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
                    </div>

                    <div>
                        <Input
                            {...getFieldProps("phone")}
                            placeholder="Teléfono"
                            className="bg-white h-12 text-gray-500"
                        />
                        {errors.phone && touched.phone && <div className="text-red-500">{errors.phone}</div>}
                    </div>

                    <div>
                        <Select
                            onValueChange={(value) => getFieldProps("state").onChange({ target: { value, name: "state" } })}
                        >
                            <SelectTrigger>
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
                        {errors.state && touched.state && <div className="text-red-500">{errors.state}</div>}
                    </div>

                    {/* Campo fuente oculto con valor predefinido */}
                    <input type="hidden" name="source" value="Landing_Fovissste" />

                    <div>
                        <Textarea
                            {...getFieldProps("comments")}
                            placeholder="Escribe un mensaje"
                            className="bg-white text-gray-500"
                        />
                        {errors.comments && touched.comments && <div className="text-red-500">{errors.comments}</div>}
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                        <ReCAPTCHA
                            sitekey="6LcKQOocAAAAAMz5X3c9pxRyCRKNaNKQO0uI4p19"
                            onChange={async (e) => {
                                await setFieldValue("recaptcha", e);
                            }}
                        />
                    </div>
                    <div>
                        <Button type="submit" className="w-full bg-blue-600 text-white h-12">
                            Solicitar información                     <svg
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
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default InfonavitForm;
