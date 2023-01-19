import { Category, PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import React, { useRef } from 'react';
import Axios from '../utils/Axios';

type Iprops = {
  categories: Category[];
  className: string;
};

const CategoryPage = ({ categories, className }: Iprops) => {
  async function handleSubmit(e: any) {
    e.preventDefault();
    const { category } = e.target.elements;
    // console.log(category.value);
    const { data, status } = await Axios.post('/api/product/add-category', {
      name: category.value,
    });
    if (data.error) return console.log(data.error);
    if (status === 200 || status === 201) {
      return console.log(status, data);
    }
  }

  return (
    <div className={className}>
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

      <h1 className="text-2xl">Categories</h1>
      <div className="inline-block">
        {categories?.length > 0 ? (
          categories?.map((cat: any) => (
            <div
              key={cat.id}
              className="bg-dark/10 text-black rounded-sm shadow-md"
            >
              {cat}
            </div>
          ))
        ) : (
          <div className="text-base ">No data found</div>
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
