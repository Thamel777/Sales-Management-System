// resources/js/Pages/CustomerList.jsx
import React from 'react';
import { Head, InertiaLink } from '@inertiajs/inertia-react';
import AdminLayout from '@/Layouts/AdminLayout';

const CustomerList = ({ customers }) => {
    return (
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th>Customer Id</th>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>Mobile Number</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map((customer) => (
                                        <tr key={customer.id}>
                                            <td>{customer.id}</td>
                                            <td>{customer.name}</td>
                                            <td>{customer.address}</td>
                                            <td>{customer.customer_phone}</td>
                                            <td><InertiaLink href={`/admin/edit-customer/${customer.id}`}>Edit</InertiaLink></td>
                                            <td>
                                                <form
                                                    method="POST"
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                        if (confirm('Are you sure?')) {
                                                            Inertia.post(`/admin/delete-customer/${customer.id}`, {
                                                                _method: 'delete',
                                                                _token: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                                                            });
                                                        }
                                                    }}
                                                >
                                                    <button type="submit" className="text-red-500 hover:underline">Delete</button>
                                                </form>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default CustomerList;
