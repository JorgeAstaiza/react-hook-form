import { useForm } from "react-hook-form";

function validateBirthDate(value) {
  const fechaNacimiento = new Date(value);
  const fechaActual = new Date();
  const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

  return edad >= 18 || "Debe ser mayor de edad";
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      nombre: "Alex",
    },
  });

  const handleSubmitForm = (data) => {
    handleSubmit;
    console.log("form", data);
  };

  const resetForm = () => {
    reset();
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <label htmlFor="nombre">Nombre</label>
      <input
        type="nombre"
        id="nombre"
        {...register("nombre", {
          required: {
            value: true,
            message: "Nombre es requerido",
          },
          minLength: {
            value: 3,
            message: "Nombre debe tener al menos 3 caracteres",
          },
        })}
      />
      {errors.nombre && <span>{errors.nombre.message}</span>}

      <label htmlFor="email">Correo</label>
      <input
        type="email"
        {...register("email", {
          required: {
            value: true,
            message: "Correo es requerido",
          },
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
            message: "Correo invalido",
          },
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}

      <label htmlFor="password">Password</label>
      <input
        type="password"
        {...register("password", {
          required: {
            value: true,
            message: "Password es requerido",
          },
          minLength: {
            value: 6,
            message: "El password debe tener el menos 6 caracteres",
          },
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}

      <label htmlFor="confirmarPassword">Confirm Password</label>
      <input
        type="password"
        {...register("confirmarPassword", {
          required: {
            value: true,
            message: "Password es requerida",
          },
          validate: (value) => {
            return value === watch("password") || "Los passwords no coiciden";
          },
        })}
      />
      {errors.confirmarPassword && (
        <span>{errors.confirmarPassword.message}</span>
      )}

      <label htmlFor="birthdate">Fecha de nacimiento</label>
      <input
        type="date"
        {...register("fechaNacimiento", {
          required: {
            value: true,
            message: "Fecha de nacimiento es requerido",
          },
          validate: (value) => {
            return validateBirthDate(value);
          },
        })}
      />
      {errors.fechaNacimiento && <span>{errors.fechaNacimiento.message}</span>}

      <label htmlFor="pais">Pais</label>
      <select name="pais" id="pais" {...register("pais")}>
        <option value="mx">Mexico</option>
        <option value="co">Colombia</option>
        <option value="ar">Argentina</option>
      </select>

      {watch("pais") === "ar" && (
        <>
          <input
            type="text"
            placeholder="Provincia"
            {...register("provincia", {
              required: {
                value: true,
                message: "Provincia es requerida",
              },
            })}
          />
          {errors.provincia && <span>{errors.provincia.message}</span>}
        </>
      )}

      <label htmlFor="file" {...register("file")}>
        Foto
      </label>
      <input type="file" />

      <label htmlFor="terminos">Aceptar terminos y condiciones</label>
      <input
        type="checkbox"
        {...register("terminos", {
          required: true,
        })}
      />

      <button type="submit">Enviar</button>
      <button type="submit" onClick={resetForm}>
        Reset
      </button>
    </form>
  );
}

export default App;
