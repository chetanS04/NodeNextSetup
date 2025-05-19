'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ProtectedRoute from '@/app/components/ProtectedRoute'
import { useLoader } from "@/context/LoaderContext";
import * as yup from 'yup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from '@/app/components/Modal';
import DashboardLayout from '@/app/layouts/DashboardLayout';
import { Product, FormData } from '@/common/interface';
import SuccessMessage from '@/app/components/SuccessMessage';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .positive('Price must be positive')
    .required('Price is required'),
  location: yup.string().required('Location is required'),
  status: yup.boolean().required('Status is required'),
});

export default function ProductForm() {
const { showLoader, hideLoader } = useLoader();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [data, setData] = useState<Product[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      status: true,
    },
  });

  const openModal = (product: Product | null = null) => {
    setSelectedProduct(product);

    if (product) {
      setValue('title', product.title);
      setValue('description', product.description);
      setValue('price', product.price);
      setValue('location', product.location);
      setValue('status', product.status);
    } else {
      // Reset form for adding new product
      reset({ status: true });
    }
    setIsModalOpen(true);
  };

  const getAllProducts = async () => {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get('http://localhost:3080/get-products', config);
      
      if (response.status === 200) {
        setData(response.data.data);
      } else {
        console.warn('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const confirmDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (!selectedProduct) return;

    try {
      const response = await axios.delete(
        `http://localhost:3080/delete-product/${selectedProduct.id}`,
        config
      );
showLoader()
      if (response.status === 200) {
        setSuccessMessage('Product deleted successfully!');
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
        await getAllProducts(); 
        hideLoader()
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const onSubmit = async (formData: FormData) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      if (selectedProduct) {
showLoader()
        const response = await axios.put(
          `http://localhost:3080/update-product/${selectedProduct.id}`,
          formData,
          config
        );

        if (response.status === 200) {
          setSuccessMessage('Product updated successfully!');
          setIsModalOpen(false);
          setSelectedProduct(null);
          await getAllProducts();
          hideLoader()
        }
      } else {
        // Create new product
                      showLoader()

        const response = await axios.post('http://localhost:3080/create-products', formData, config);

        if (response.status === 201) {
          setSuccessMessage('Product added successfully!');
          setIsModalOpen(false);
          await getAllProducts();
                    hideLoader();
 // refresh list
        }
      }
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  const isChecked = watch('status');

  return (
    <ProtectedRoute role="ADMIN">
                  {successMessage && <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)} />}

      <DashboardLayout>
        <>
          <div className="flex justify-end items-stretch">
            <button
              onClick={() => openModal(null)}
              className="bg-green-600 text-white px-4 py-2 rounded mb-4 text-end"
            >
              Add Product
            </button>
          </div>

          <div className="overflow-x-auto rounded shadow-md">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((product, index) => (
                  <tr key={product.id || index}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹ {product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${product.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                      >
                        {product.status ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => openModal(product)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => confirmDelete(product)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal for Create/Edit */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={selectedProduct ? 'Edit Product' : 'Create Product'}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                {...register('title')}
                placeholder="Title"
                className="w-full p-2 border rounded"
              />
              <p className="text-red-500">{errors.title?.message}</p>

              <input
                {...register('description')}
                placeholder="Description"
                className="w-full p-2 border rounded"
              />
              <p className="text-red-500">{errors.description?.message}</p>

              <input
                type="number"
                {...register('price')}
                placeholder="Price"
                className="w-full p-2 border rounded"
              />
              <p className="text-red-500">{errors.price?.message}</p>

              <input
                {...register('location')}
                placeholder="Location"
                className="w-full p-2 border rounded"
              />
              <p className="text-red-500">{errors.location?.message}</p>

              <label
                htmlFor="status"
                className="group flex cursor-pointer items-center justify-start gap-1"
              >
                <div
                  className={`flex h-5 w-10 items-center rounded-full border border-zinc-950 p-1 transition-all duration-300 ${isChecked ? 'bg-zinc-950 dark:bg-zinc-50' : 'bg-gray-300 dark:bg-zinc-950'
                    }`}
                >
                  <input type="checkbox" {...register('status')} hidden id="status" />
                  <div
                    className={`h-4 w-4 transform rounded-full bg-white shadow-md transition-all ${isChecked ? 'translate-x-5' : 'translate-x-0'
                      }`}
                  ></div>
                </div>
                <span className="pt-1 text-[1.1rem] leading-[100%] text-zinc-500 select-none dark:text-zinc-300">
                  Status
                </span>
              </label>
              <p className="text-red-500">{errors.status?.message}</p>

              <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  {selectedProduct ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal>

          {/* Delete confirmation modal */}
          <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            title="Confirm Delete"
          >
            <p>
              Are you sure you want to delete <strong>{selectedProduct?.title}</strong>?
            </p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="rounded bg-gray-500 px-4 py-2 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="rounded bg-red-500 px-4 py-2 text-white"
              >
                Delete
              </button>
            </div>
          </Modal>

      
        </>
      </DashboardLayout>
    </ProtectedRoute>

  );
}
