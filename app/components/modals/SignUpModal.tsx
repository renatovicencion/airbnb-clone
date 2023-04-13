"use client";

import React, { useCallback, useState } from "react";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useSignUpModal from "@/app/hooks/useSignUpModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";

const SignUpModal = () => {
	const signUpModal = useSignUpModal();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios
			.post("/api/signup", data)
			.then(() => {
				signUpModal.onClose();
			})
			.catch((error) => {
				toast.error("Oops!, something went wrong.");
				console.log(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const bodyContent = (
		<div className='flex flex-col gap-4'>
			<Heading title='Welcome to Airbnb' subtitle='Create an account!' />
			<Input
				id='email'
				label='Email'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>

			<Input
				id='name'
				label='Name'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>

			<Input
				id='password'
				type='password'
				label='Password'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	);

	const footerContent = (
		<div className='mt-3 flex flex-col gap-4'>
			<hr />
			<Button
				outline
				label='Continue with Google'
				icon={FcGoogle}
				onClick={() => {}}
			/>

			<Button
				outline
				label='Continue with Github'
				icon={AiFillGithub}
				onClick={() => {}}
			/>

			<div className='mt-4 text-center font-light text-neutral-500'>
				<div className='flex flex-row items-center justify-center gap-2'>
					<div>Already have an account?</div>

					<div
						onClick={signUpModal.onClose}
						className='cursor-pointer text-neutral-800 hover:underline'
					>
						Sign in
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={signUpModal.isOpen}
			title='Register'
			actionLabel='Continue'
			onClose={signUpModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default SignUpModal;
