import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Definición de los datos del formulario
interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    state: string;
    source: string;
    message?: string; // El campo 'message' sigue siendo opcional
}

const FormComponent: React.FC = () => {
    // Esquema de validación de Yup
    const validationSchema = Yup.object({
        first_name: Yup.string().required('El nombre es obligatorio').max(40, 'Máximo 40 caracteres'),
        last_name: Yup.string().required('El apellido es obligatorio').max(80, 'Máximo 80 caracteres'),
        email: Yup.string().required('El correo es obligatorio').email('Correo inválido').max(80, 'Máximo 80 caracteres'),
        phone: Yup.string().required('El teléfono es obligatorio').max(40, 'Máximo 40 caracteres'),
        state: Yup.string().required('El estado es obligatorio').max(20, 'Máximo 20 caracteres'),
        source: Yup.string().required('Fuente es obligatoria'),
        message: Yup.string().max(255, 'Máximo 255 caracteres').optional(),
    });

    // Hook para manejar el formulario
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(validationSchema), // Resolver con Yup
    });

    // Función para manejar el envío del formulario
    const onSubmit = async (data: FormData) => {
        const formData = new URLSearchParams();
        formData.append('oid', '00Do0000000b6Io'); // ID de la organización en Salesforce
        formData.append('retURL', 'https://www.javer.com.mx/gracias'); // URL de redirección

        // Agregar los campos del formulario a formData
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('state', data.state);
        formData.append('00N3l00000Q7A57', data.source); // Este es el ID de Salesforce para el campo "Fuente"
        if (data.message) {
            formData.append('00N3l00000Q7A4r', data.message); // Este es el ID de Salesforce para el campo "Mensaje"
        }

        // Hacer la solicitud POST a Salesforce
        try {
            const response = await fetch('https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
                // mode: 'no-cors',
            });

            if (response.ok) {
                window.location.href = 'https://www.javer.com.mx/gracias'; // Redirigir en caso de éxito
            } else {
                console.error('Error al enviar el formulario a Salesforce.');
            }
        } catch (error) {
            console.error('Ocurrió un error al intentar enviar los datos:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="captcha_settings" value='{"keyname":"MUNDOJAVER","fallback":"true","orgId":"00Do0000000b6Io","ts":""}' />
            <input type="hidden" name="oid" value="00Do0000000b6Io" />
            <input type="hidden" name="retURL" value="https://www.javer.com.mx/gracias" />

            {/* Nombre */}
            <input id="first_name" {...register('first_name')} placeholder="Nombre" />
            {errors.first_name && <p>{errors.first_name.message}</p>}

            {/* Apellido */}
            <input id="last_name" {...register('last_name')} placeholder="Apellido" />
            {errors.last_name && <p>{errors.last_name.message}</p>}

            {/* Correo */}
            <input id="email" {...register('email')} placeholder="Correo" />
            {errors.email && <p>{errors.email.message}</p>}

            {/* Teléfono */}
            <input id="phone" {...register('phone')} placeholder="Teléfono" />
            {errors.phone && <p>{errors.phone.message}</p>}

            {/* Estado */}
            <input id="state" {...register('state')} placeholder="Estado" />
            {errors.state && <p>{errors.state.message}</p>}

            {/* Fuente */}
            <select id="00N3l00000Q7A57" {...register('source')}>
                <option value="">--None--</option>
                <option value="Landing_Fovissste">Landing_Fovissste</option>
            </select>
            {errors.source && <p>{errors.source.message}</p>}

            {/* Mensaje */}
            <textarea id="00N3l00000Q7A4r" {...register('message')} placeholder="Mensaje"></textarea>
            {errors.message && <p>{errors.message?.message}</p>}

            {/* reCAPTCHA */}
            <div className="g-recaptcha" data-sitekey="6LcKQOocAAAAAMz5X3c9pxRyCRKNaNKQO0uI4p19"></div>

            <button type="submit">Enviar</button>
        </form>
    );
};

export default FormComponent;
