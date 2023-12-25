"use client";
import type { Brand } from "@prisma/client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, SyntheticEvent } from "react";


const AddProduct = ({ brands }: { brands: Brand[] }) => {

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");

    const [open, setIsOpen] = useState(false);

    const router = useRouter();

    const handleModal = () => {
        setIsOpen(!open);
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post('/api/products', {
            title: title,
            price: Number(price),
            brandId: brand
        })
        setTitle("");
        setPrice("");
        setBrand("");
        router.refresh();
        setIsOpen(false);
    }
    return (
        <div>
            <button className="btn" onClick={handleModal}>Add New</button>

            <div className={open ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Product</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Product Name</label>
                            <input type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="input input-bordered" placeholder="Product Name" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Price</label>
                            <input type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="input input-bordered" placeholder="Price" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Brand</label>
                            <select
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                className="select select-bordered">
                                <option value="" disabled>Select Brand</option>
                                {brands.map((brand) => (
                                    <option value={brand.Id} key={brand.Id}>{brand.nama}</option>
                                ))}

                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleModal}>Close</button>
                            <button type="submit" className="btn btn-primary">Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct