import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, Formik } from "formik";
import * as yup from "yup";
// import ReCAPTCHA from "react-google-recaptcha";
export const ContactForm2 = () => {
    const validationSchema = yup.object().shape({
        firstName: yup.string().required("Este campo es requerido"),
        lastName: yup.string().required("Este campo es requerido"),
        email: yup.string().email("Correo inválido").required("Este campo es requerido"),
        phone: yup.string().required("Este campo es requerido"),
        state: yup.string().required("Este campo es requerido"),
        source: yup.string().required("Este campo es requerido"),
        message: yup.string().required("Este campo es requerido"),
        // recaptcha: yup.string().required("Este campo es requerido"),
    });

    return (
        <Formik
            initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                state: "",
                source: "",
                message: "",
                // recaptcha: undefined as string | undefined,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
                try {
                    const response = await fetch(
                        "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00Do0000000b6Io",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                            body: new URLSearchParams({
                                oid: "00Do0000000b6Io",
                                retURL: "https://www.javer.com.mx/gracias",
                                first_name: values.firstName,
                                last_name: values.lastName,
                                email: values.email,
                                phone: values.phone,
                                state: values.state,
                                // "g-recaptcha-response": values.recaptcha ?? "",
                                "00N3l00000Q7A57": values.source,
                                "00N3l00000Q7A4r": values.message,
                            }).toString(),
                        }
                    );

                    if (!response.ok) {
                        throw new Error("Error en la solicitud");
                    }

                    resetForm();
                    window.location.href = "https://www.javer.com.mx/gracias";
                } catch (error) {
                    console.error("Error:", error);
                }
            }}
        >
            {({ getFieldProps, setFieldValue }) => (
                <Form>
                    <Input {...getFieldProps("firstName")} placeholder="Nombre" />
                    <Input {...getFieldProps("lastName")} placeholder="Apellido" />
                    <Input {...getFieldProps("email")} placeholder="Correo electrónico" />
                    <Input {...getFieldProps("phone")} placeholder="Teléfono" />
                    <Input {...getFieldProps("state")} placeholder="Estado/Provincia" />

                    <Select name="source" onValueChange={(value) => setFieldValue("source", value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Fuente" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Landing_Fovissste">Landing_Fovissste</SelectItem>
                            <SelectItem value="Otra fuente">Otra fuente</SelectItem>
                        </SelectContent>
                    </Select>

                    <Textarea {...getFieldProps("message")} placeholder="Comentarios" />
                    {/* <div className="col-span-1 sm:col-span-2">
                        <ReCAPTCHA
                            sitekey="6LcKQOocAAAAAMz5X3c9pxRyCRKNaNKQO0uI4p19"
                            onChange={async (e) => {
                                await setFieldValue("recaptcha", e);
                            }}
                        />
                    </div> */}
                    <Button type="submit">Enviar</Button>
                </Form>
            )}
        </Formik>
    );
};
