import { Category, PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import React, { useState, useEffect } from 'react';
import Axios from '../utils/Axios';
import { AlertMsg } from './Alert';

const CategoryPage = ({ ca, className }: any) => {
  const [cats, setCats] = useState<Category[]>([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setCats(ca);

    return () => {
      controller.abort();
    };
  }, [cats, ca]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const { category } = e.target.elements;
    const { data, status } = await Axios.post('/api/product/add-category', {
      name: category.value,
    });
    if (data.error) return console.log(data.error);
    if (status === 200 || status === 201) {
      return;
    }
  }

  return (
    <div className={className + 'block w-full'}>
      <h1 className="text-2xl text-center">Add Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category Name</label>
          <input
            type="text"
            className="form-control"
            name="category"
            id="category"
          />
        </div>
        <div className="form-group">
          <button className="py-3 px-5 rounded-sm bg-blue-500 hover:bg-blue-600 text-blue-50">
            Add Category
          </button>
        </div>
      </form>
      {error && <AlertMsg type={'alert-error'} message={message} />}
      {success && <AlertMsg type={'alert-success'} message={message} />}
      <h1 className="text-2xl">Categories</h1>
      <div className="block">
        {cats?.length > 0 ? (
          cats?.map((cat) => (
            <div
              key={cat.id}
              className="bg-dark/10 text-base capitalize py-2 px-12 text-black rounded-sm shadow-md"
            >
              {cat.name}
            </div>
          ))
        ) : (
          <div className="text-base py-3 px-10">No data found</div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const prisma = new PrismaClient();
//   const client = prisma.category;
//   const categories = await client.findMany();
//   return {
//     props: {
//       categories: JSON.parse(JSON.stringify(categories)),
//     },
//   };
// };
