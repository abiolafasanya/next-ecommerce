import React, { useState, useRef, useId } from 'react';
import { useFormik, Formik } from 'formik';
import dynamic from 'next/dynamic';
import CreatableSelect from 'react-select/creatable';
import { EditorProps } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import * as Yup from 'yup';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import NoSSR from '../../components/NoSSR';
import Axios from '../../utils/Axios';
import CategoryPage from '../../components/CategoryPage';
import { Category, PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { AlertMsg } from '../../components/Alert';

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

interface MyFormValues {
  name: string;
  price: number;
  description: string;
  brief: string;
  category: string[];
}

type Iprops = {
  categories: Category[];
};

const options = [
  { value: 'newArrival', label: 'New Arrival' },
  { value: 'topSeller', label: 'Top Seller' },
  { value: 'bestSeller', label: 'Best Seller' },
];

const AddProduct: React.FC<Iprops> = ({ categories }) => {
  const [category, setCategory] = useState<any>([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const initialValues: MyFormValues = {
    name: '',
    price: 0.0,
    description: '',
    category: [],
    brief: '',
  };

  async function handleSubmit(event: any) {
    event.preventDefault();
    const { name, price, brief } = event.target.elements;
    const formData = {
      name: name.value,
      price: parseFloat(price.value),
      brief: brief.value,
      category,
      description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    };

    const { data, status } = await Axios.post('/api/product/add', formData);
    if (data.error) {
      setError(true);
      setMessage('Failed, please check your inputs and try again later');
      setTimeout(() => {
        setError(false);
        setMessage('');
      }, 3000);
      console.log(status, data.error);
      return;
    }
    if (status === 201 || status === 200) {
      // console.log(data);
      setSuccess(true);
      setMessage('Product was added successfully');
      setTimeout(() => {
        setSuccess(false);
        setMessage('');
      }, 3000);
      return;
    }

    console.log(formData);
  }

  return (
    <NoSSR>
      <div className="max-w-6xl mx-auto flex sm:flex-col lg:flex-row">
        <div className="lg:w-[70%] p-5">
          <h1 className="text-2xl text-center">Add Product</h1>
          {error && <AlertMsg type={'alert-error'} message={message} />}
          {success && <AlertMsg type={'alert-success'} message={message} />}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Product Name
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Brief
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Description
              </label>
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName border"
                editorClassName="editorClassName p-3"
                placeholder="Write something"
                onEditorStateChange={(newState) => {
                  setEditorState(newState);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Price
              </label>
              <input type="number" step="0.01" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Category
              </label>
              <CreatableSelect
                instanceId={useId()}
                inputId="category"
                isClearable
                isMulti
                onChange={(e) => setCategory(e.map((item: any) => item.value))}
              />
            </div>
            <div className="form-group">
              <button className="py-3 px-5 rounded-sm bg-blue-500 text-blue-50">
                Save Product
              </button>
            </div>
          </form>
        </div>
        <CategoryPage ca={categories} className="lg:w-[25%] p-5" />
      </div>
    </NoSSR>
  );
};

export default AddProduct;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const client = prisma.category;
  const categories = await client.findMany();
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
};
