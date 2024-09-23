/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, Formik } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
// import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { SALESFORCE_ORG_ID, SALESFORCE_URL } from "@/constants";

interface ContactFormProps {
  className?: string;
}

export const ContactForm = ({ className }: ContactFormProps) => {

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("Este campo es requerido"),
    lastName: yup.string().required("Este campo es requerido"),
    email: yup
      .string()
      .email("Correo inválido")
      .required("Este campo es requerido"),
    phone: yup.string().required("Este campo es requerido"),
    birthDate: yup.date().required("Este campo es requerido"),
    development: yup.string().required("Este campo es requerido"),
    typeOfCredit: yup.string().required("Este campo es requerido"),
    message: yup.string().required("Este campo es requerido"),
    recaptcha: yup.string().required("Este campo es requerido"),
    acceptPolicy: yup
      .boolean()
      .required("Este campo es requerido")
      .isTrue("Este campo es requerido"),
  });

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        development: undefined as string | undefined,
        typeOfCredit: undefined as string | undefined,
        message: "",
        recaptcha: undefined as string | undefined,
        acceptPolicy: false,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await fetch(
          `${SALESFORCE_URL}&${new URLSearchParams({
            captcha_settings: `{"keyname":"CAPTCHAJAVER","fallback":"true","orgId":"${SALESFORCE_ORG_ID}","ts":"${JSON.stringify(new Date().getTime())}"}`,
            oid: SALESFORCE_ORG_ID,
            retURL: "https://www.javer.com.mx/gracias",
            "g-recaptcha-response": values.recaptcha ?? "",
            first_name: values.firstName,
            last_name: values.lastName,
            phone: values.phone,
            email: values.email,
            "00N3l00000Q7A54": values.development ?? "",
            "00N3l00000Q7A5V": values.typeOfCredit ?? "",
            "00N3l00000Q7A57": "Sitio_Javer",
            "00N3l00000Q7A4n": "Medios Digitales",
            "00N3l00000Q7A5S": "Pagina web Javer",
            message: values.message,
            acceptPolicy: "on",
          }).toString()}`,
          {
            method: "POST",
            mode: "no-cors",
          }
        )
          .then((_response) => {
            resetForm();

            // Redirigir directamente a la página de gracias
            window.location.href = "https://www.javer.com.mx/gracias";
          })
          .catch((err) => {
            console.log(err)
          });
      }}
      validateOnChange
      validateOnMount
    >
      {({ getFieldProps, setFieldValue, isValid }) => (
        <Form
          className={`grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-4 w-full ${className}`}
        >
          <div>
            <Label htmlFor="firstName">nombre</Label>
            <Input {...getFieldProps("firstName")} />
          </div>
          <div>
            <Label htmlFor="lastName">Apellido</Label>
            <Input {...getFieldProps("lastName")} />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <Label htmlFor="email">Correo</Label>
            <Input {...getFieldProps("email")} />
          </div>
          <div>
            <Label htmlFor="phone">Teléfono</Label>
            <Input {...getFieldProps("phone")} />
          </div>
          <div>
            <Label htmlFor="typeOfCredit">Tipo de crédito</Label>
            <Select
              name="typeOfCredit"
              onValueChange={(value) => {
                setFieldValue("typeOfCredit", value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-">--Ninguno--</SelectItem>
                <SelectItem value="INFONAVIT">INFONAVIT</SelectItem>
                <SelectItem value="ISSSTELEON">ISSSTELEON</SelectItem>
                <SelectItem value="SHF/BANCO">SHF/BANCO</SelectItem>
                <SelectItem value="BANCO - SOFOL">BANCO - SOFOL</SelectItem>
                <SelectItem value="COFINAVIT">COFINAVIT</SelectItem>
                <SelectItem value="CONTADO">CONTADO</SelectItem>
                <SelectItem value="FOVISSSTE">FOVISSSTE</SelectItem>
                <SelectItem value="OTROS / NO SE">OTROS / NO SE</SelectItem>
                <SelectItem value="BANJERCITO">BANJERCITO</SelectItem>
                <SelectItem value="ISSFAM">ISSFAM</SelectItem>
                <SelectItem value="PENSIONES">PENSIONES</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-1 sm:col-span-2">
            <Label htmlFor="message">Mensaje</Label>
            <Textarea
              placeholder="Escribe un mensaje"
              {...getFieldProps("message")}
            />
          </div>

          <div className="col-span-1 sm:col-span-2">
            <ReCAPTCHA
              sitekey="6Lcg2vQZAAAAAHpqmf6Pj_-t-doxKr1iwLWfQuWQ"
              onChange={async (e) => {
                await setFieldValue("recaptcha", e);
              }}
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <Button
              size="lg"
              type="submit"
              className="w-full md:w-fit"
              disabled={!isValid}
            >
              Enviar
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
