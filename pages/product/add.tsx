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
import Category from '../../components/category';

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

const AddProduct: React.FC<{}> = () => {
  const nameRef = useRef<HTMLInputElement>();
  const priceRef = useRef<HTMLInputElement>();
  const briefRef = useRef<HTMLInputElement>();
  const [category, setCategory] = useState([]);

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

  const options = [
    { value: 'newArrival', label: 'New Arrival' },
    { value: 'topSeller', label: 'Top Seller' },
    { value: 'bestSeller', label: 'Best Seller' },
  ];

  async function handleSubmit(event: any) {
    event.preventDefault();
    const formData = {
      name: nameRef.current?.value,
      price: parseFloat(priceRef.current?.value),
      brief: briefRef.current?.value,
      category,
      description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    };

    const { data, status } = await Axios.post('/api/product/add', formData);
    if (data.error) return console.log(data.error);
    if (status === 201 || status === 200) {
      console.log(data);
      return;
    }

    console.log(formData);
  }

  return (
    <NoSSR>
      <div className="max-w-6xl mx-auto flex sm:flex-col lg:flex-row">
        <div className="lg:w-[70%] p-5">
          <h1 className="text-2xl text-center">Add Product</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Product Name
              </label>
              <input type="text" ref={nameRef} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Brief
              </label>
              <input type="text" ref={briefRef} className="form-control" />
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
              <input
                type="number"
                ref={priceRef}
                step="0.01"
                className="form-control"
              />
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
        <Category className="lg:w-[25%] p-5" />
      </div>
    </NoSSR>
  );
};

export default AddProduct;
