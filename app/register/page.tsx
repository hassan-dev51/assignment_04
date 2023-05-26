"use client";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Navbar from "@/components/Navbar";

type FormData = {
  name: string;
  delieveryAddress: string;
  email: string;
  password: string;
};

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z ]+$/, "Only alphabets are allowed")
    .required("Name is required"),
  delieveryAddress: yup
    .string()
    .matches(/^[A-Za-z ]+$/, "Only alphabets are allowed")
    .required("Lastname is required"),
  email: yup
    .string()
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email address"
    )
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[\!\@\#\$\%\^\&\*\(\)\-\+\=\[\]\{\}\|\:\;\"\'\,\.\<\>\/\?].*[\!\@\#\$\%\^\&\*\(\)\-\+\=\[\]\{\}\|\:\;\"\'\,\.\<\>\/\?]).{8,}$/,
      "password should contain uppercase lowercase and numbers"
    )
    .required("Password is required"),
});

const Reginster = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  const [result, setResult] = useState("");
  const FormSubmit: SubmitHandler<FormData> = async (d, e) => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/register",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: d.name,
            email: d.email,
            password: d.password,
            delieveryAddress: d.delieveryAddress,
          }),
        }
      );
      if (res.status === 200) {
        setResult("Registration successful");
        alert("Registration successful");
        e?.target.reset();
      } else if (res.status === 400) {
        setResult("Email already registered");
        alert("Email already registered");
      } else {
        setResult("Registration failed");
        alert("Registration failed");
      }
      return res.text();
    } catch (error) {
      console.log(error);
    }
    console.log(d);
  };

  return (
    <div className="bg-[#000814] h-screen">
      <Navbar />
      <div className="p-8 m-auto w-[640px]">
        <div>
          <h2 className="text-[#1A202C] text-[48px] font-bold capitalize">
            your details
          </h2>
          <h3 className="text-[#1A202C] text-[16px] font-normal">
            If you already have an account, click here to{" "}
            <Link href="/login">Login</Link>
          </h3>
        </div>
        <form
          className="mt-12 flex flex-col gap-5 w-[560px]"
          method="POST"
          onSubmit={handleSubmit(FormSubmit)}
        >
          <div className="flex items-start gap-3">
            <label className="flex flex-col">
              <span className="font-medium mb-4">Name</span>
              <input
                type="text"
                {...register("name")}
                placeholder="What's your good name?"
                required
                className="bg-[#EDF2F7] py-4 px-6 placeholder:text-secondary outline-none border-none font-medium w-[272px]"
              />
            </label>
            {errors.name && (
              <p className="text-red-400 p-1">{errors.name.message}</p>
            )}
            {/* last-name */}
            <label className="flex flex-col">
              <span className=" font-medium mb-4">Last Name</span>
              <input
                type="text"
                {...register("delieveryAddress")}
                placeholder="What's your last name?"
                required
                className="bg-[#EDF2F7] py-4 px-6 placeholder:text-secondary outline-none border-none font-medium w-[272px]"
              />
            </label>
            {errors.delieveryAddress && (
              <p className="text-red-400 p-1">
                {errors.delieveryAddress.message}
              </p>
            )}
          </div>

          {/* email */}
          <label className="flex flex-col">
            <span className=" font-medium mb-4">Email</span>
            <input
              type="email"
              {...register("email")}
              placeholder="What's your email address?"
              required
              className="bg-[#EDF2F7] py-4 px-6 placeholder:text-secondary   outline-none border-none font-medium"
            />
          </label>
          {errors.email && (
            <p className="text-red-400 p-1">{errors.email.message}</p>
          )}

          <label className="flex flex-col">
            <span className=" font-medium mb-4">Password</span>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              required
              minLength={8}
              autoComplete="off"
              className="bg-[#EDF2F7] py-4 px-6 placeholder:text-secondary   outline-none border-none font-medium"
            />
          </label>
          {errors.password && (
            <p className="text-red-400 p-1">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="bg-[#8ac919] py-3 px-8 text-[20px] outline-none w-full text-white font-normal hover:bg-white hover:text-[#8ac919] hover:outline-[#8ac919]"
          >
            Sign up
          </button>
        </form>
      </div>

      {result === "200" && <p>Registration successful</p>}
      {result === "error" && <p>Registration failed</p>}
    </div>
  );
};

export default Reginster;
