import React, { useState, useEffect, useId, useRef } from 'react';
import dynamic from 'next/dynamic';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { EditorProps } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import NoSSR from '../../components/NoSSR';
import Axios from '../../utils/Axios';
import CategoryPage from '../../components/CategoryPage';
import { Category, PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { AlertMsg } from '../../components/Alert';
import { useSession, getSession, signIn } from 'next-auth/react';
import { MdOutlineFileUpload } from 'react-icons/md';
import Container from '../../components/Container';

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

type Iprops = {
  categories: Category[];
};

const AddProduct: React.FC<Iprops> = ({ categories }) => {
  const [category, setCategory] = useState<any>();
  const [tags, setTags] = useState<any>([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [useImageLink, setUseImageLink] = useState(false);

  // form element ref
  // name, price, brief, image
  const productRef = useRef<HTMLInputElement>(null)
  const briefRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const controller = new AbortController();
    console.log(category);

    return () => {
      controller.abort();
    };
  }, [category]);

  const { status, data: session } = useSession();
  const options = [] as any;

  const catOptions = categories.forEach((category) => {
    options.push({ value: category.id, label: category.name });
  });

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  async function cloudinaryUpload(
    url: string,
    file: any,
    options = { upload_present: 'my-uploads' }
  ): Promise<any> {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', options.upload_present as string);
    const upload = await fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => data.secure_url)
      .catch((err) => {
        console.log(err);
        return null;
      });
    return upload;
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    const { name, price, brief, image } = event.target.elements;

    let URLCloudinary =
      'https://api.cloudinary.com/v1_1/fastbeetech/image/upload';

    const options = { upload_present: 'ecommerce' };

    const img = useImageLink
      ? await cloudinaryUpload(URLCloudinary, image, options)
      : image.value;
    console.log(img);

    const formData = {
      name: name.value,
      price: parseFloat(price.value),
      brief: brief.value,
      categoryId: category,
      tags: tags,
      image: await img,
      description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    };

    const { data, status } = await Axios.post('/api/product/add', formData);
    if (
      data.error ||
      status === 400 ||
      status === 401 ||
      status === 404 ||
      status === 500
    ) {
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
        name.value, price.value, brief.value, (image.value = '');
      }, 3000);
      return;
    }

    console.log(formData);
  }

  function handleImageType() {
    setUseImageLink((type) => !type);
  }

  return (
    <Container>
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
                <input type="text" id="name" ref={productRef} className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="brief" className="form-label">
                  Brief
                </label>
                <input type="text" id="brief" ref={briefRef} className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="description" className="form-label">
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
                <label htmlFor="name" id="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  ref={priceRef}
                  step="0.01"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="image" id="image" className="form-label">
                  Image
                </label>
                {useImageLink ? (
                  <>
                    <input
                      type="text"
                      id="image"
                      ref={imageRef}
                      className="form-control"
                      placeholder={'Paste Image URL here'}
                    />
                  </>
                ) : (
                  <div className="border rounded bg-blue-100">
                    <MdOutlineFileUpload className="absolute mt-2 text-blue-50 mx-3 text-2xl" />
                    <input
                      type="file"
                      id="image"
                      className="file:px-12 file:py-3 file:rounded-sm file:btn file:border-none"
                      onChange={(e: any) => setImage(e.target.files[0])}
                    />
                  </div>
                )}
                Paste Image link {'  '}{' '}
                <input
                  type="checkbox"
                  className=""
                  onChange={handleImageType}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <Select
                  instanceId={useId()}
                  inputId="category"
                  isClearable
                  // isMulti
                  options={options}
                  defaultValue={options[0]}
                  onChange={(e) => setCategory(e.value)}
                  // onChange={(e) => setCategory(e.map((item: any) => item.value))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="tags" className="form-label">
                  Tags
                </label>
                <CreatableSelect
                  instanceId={useId()}
                  inputId="tags"
                  isClearable
                  isMulti
                  onChange={(e) => setTags(e.map((item: any) => item.value))}
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
    </Container>
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
