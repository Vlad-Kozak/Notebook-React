import { ISmallNote } from "../helpers/interfaces";
import { useGetCategoriesQuery } from "../redux/categoriesApi";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";

interface INoteFormProps {
  handleSubmit: Function;
  currentNote?: ISmallNote;
  children: JSX.Element;
}

interface IFormValues {
  name: string;
  categoryId: string;
  content: string;
}

export function NoteForm({
  handleSubmit,
  currentNote,
  children,
}: INoteFormProps) {
  const { data = [] } = useGetCategoriesQuery();

  const validationSchema = yup.object().shape({
    name: yup.string().max(50, "Max 50 characters").required("Required field"),
    categoryId: yup.string().required("Required field"),
    content: yup
      .string()
      .max(1000, "Max 1000 characters")
      .required("Required field"),
  });

  const initialValues: IFormValues = {
    name: currentNote ? currentNote.name : "",
    categoryId: currentNote ? currentNote.categoryId : "",
    content: currentNote ? currentNote.content : "",
  };

  const handleSubmitForm = (values: IFormValues) => {
    const { name, categoryId, content } = values;
    handleSubmit({
      id: currentNote?.id,
      name,
      categoryId,
      content,
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
    >
      {({ values, touched, errors, dirty, isValid, handleChange }) => (
        <Form className="w-[400px] text-2xl">
          <label className="flex flex-col mb-5">
            <span className="mb-5 text-white">
              Name
              {errors.name && (
                <span className="text-sm ml-2">{`(${errors.name})`}</span>
              )}
            </span>
            <Field
              className="p-2 rounded-lg outline-sky-700"
              name="name"
              autoComplete="off"
            />
          </label>

          <div className="flex flex-col mb-5 text-white">
            <span className="mb-5 text-white">Category</span>
            {[...data].map((el) => {
              return (
                <label className="flex" key={el._id}>
                  <Field
                    className="mr-2"
                    name="categoryId"
                    type="radio"
                    value={el._id}
                    checked={el._id === values.categoryId}
                  />
                  {el.name}
                </label>
              );
            })}
          </div>

          <label className="flex flex-col mb-5">
            <span className="mb-5 text-white">
              Content
              {errors.content && (
                <span className="text-sm ml-2">{`(${errors.content})`}</span>
              )}
            </span>
            <textarea
              className="h-40 p-2 rounded-lg resize-none outline-sky-700"
              name="content"
              onChange={handleChange}
              value={values.content}
            ></textarea>
          </label>

          <button
            className="block ml-auto"
            type="submit"
            disabled={!dirty || !isValid}
          >
            {children}
          </button>
        </Form>
      )}
    </Formik>
  );
}
