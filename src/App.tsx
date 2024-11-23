import { useForm } from '@mantine/form'
import {
	TextInput,
	Button,
	Flex,
	PasswordInput,
	Box,
	Image
} from '@mantine/core'
import g1 from './assets/g1.svg'
import g2 from './assets/g2.svg'
import { useState } from 'react'

type FormValues = {
	name: string
	lastName: string
	email: string
	password: string
}
interface ValidationResponse {
	mensaje: string
}

const App = () => {
	const [validationResult, setValidationResult] = useState<ValidationResponse>()

	const form = useForm({
		mode: 'uncontrolled',
		validateInputOnChange: true,
		initialValues: { name: '', lastName: '', email: '', password: '' },

		validate: {
			name: (value) =>
				value.length < 2 ? 'Name must have at least 2 letters' : null,
			lastName: (value) =>
				value.length < 2 ? 'Last Name must have at least 2 letters' : null,
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
			password: (value) =>
				value.length < 4 ? 'You must be at least 4 to register' : null
		}
	})

	const validateForm = async (
		formValues: FormValues
	): Promise<ValidationResponse> => {
		try {
			const response = await fetch(
				'http://127.0.0.1:8000/validar-formulario/',
				{
					method: 'POST',
					mode: 'no-cors',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(formValues)
				}
			)
			const data: ValidationResponse = await response.json()

			return data
		} catch (error) {
			console.error('Error al validar el formulario:', error)
			throw error
		}
	}

	const handleSubmit = async (values: FormValues) => {
		console.log('Datos enviados:', values)
		try {
			const mensaje = await validateForm(values)
			setValidationResult(mensaje)
			console.log('mensaje:', mensaje)
		} catch (error) {
			console.error('Error al validar el formulario:', error)
		}
	}

	return (
		<Flex
			h='100vh'
			w='100%'
		>
			<Box
				flex={1}
				h='100vh'
				style={{ alignContent: 'flex-end' }}
			>
				<Image
					w='auto'
					h='auto'
					src={g1}
				/>
			</Box>
			<Box
				flex={2}
				style={{ justifyItems: 'center', alignContent: 'center' }}
			>
				<Box w={500}>
					<form onSubmit={form.onSubmit(handleSubmit)}>
						<TextInput
							variant='filled'
							label='Name'
							placeholder='Name'
							key={form.key('name')}
							{...form.getInputProps('name')}
						/>
						<TextInput
							variant='filled'
							label='LastName'
							placeholder='Last Name'
							key={form.key('lastName')}
							{...form.getInputProps('lastName')}
						/>
						<TextInput
							variant='filled'
							mt='sm'
							label='Email'
							placeholder='Email'
							key={form.key('email')}
							{...form.getInputProps('email')}
						/>
						<PasswordInput
							variant='filled'
							mt='sm'
							label='Password'
							placeholder='Password'
							key={form.key('password')}
							{...form.getInputProps('password')}
						/>
						<Button
							mt='lg'
							ml='150'
							type='submit'
							w={200}
							bg='#817be7'
						>
							Submit
						</Button>
					</form>
				</Box>
			</Box>
			{validationResult
				? `los datos se validaron ${validationResult.mensaje}`
				: `no se validaron los  datos`}
			<Box
				flex={1}
				h='100vh'
				style={{
					justifyItems: 'flex-end'
				}}
			>
				<Image
					w='auto'
					h='auto'
					src={g2}
				/>
			</Box>
		</Flex>
	)
}

export default App
