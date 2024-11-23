import { useForm } from '@mantine/form'
import {
	TextInput,
	Button,
	Flex,
	PasswordInput,
	Box,
	Image,
	Modal
} from '@mantine/core'
import g1 from './assets/g1.svg'
import g2 from './assets/g2.svg'
import { useEffect, useState } from 'react'

type FormValues = {
	nombre: string
	apellido: string
	correo: string
	contrasena: string
}
interface ValidationResponse {
	mensaje: string
}

const App = () => {
	const [validationResult, setValidationResult] = useState<ValidationResponse>()
	const [opened, setOpened] = useState(false)
	const form = useForm({
		mode: 'uncontrolled',
		validateInputOnChange: true,
		initialValues: { nombre: '', apellido: '', contrasena: '', correo: '' },

		validate: {
			nombre: (value) =>
				value.length < 2 ? 'Name must have at least 2 letters' : null,
			apellido: (value) =>
				value.length < 2 ? 'Last Name must have at least 2 letters' : null,
			correo: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
			contrasena: (value) =>
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
	useEffect(() => {
		if (validationResult) {
			setOpened(true)
		}
	}, [validationResult])

	const handleSubmit = async (values: FormValues) => {
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
							placeholder='nombre'
							key={form.key('nombre')}
							{...form.getInputProps('nombre')}
						/>
						<TextInput
							variant='filled'
							label='Last Name'
							placeholder='apellido'
							key={form.key('apellido')}
							{...form.getInputProps('apellido')}
						/>
						<TextInput
							variant='filled'
							mt='sm'
							label='Email'
							placeholder='correo'
							key={form.key('correo')}
							{...form.getInputProps('correo')}
						/>
						<PasswordInput
							variant='filled'
							mt='sm'
							label='Password'
							placeholder='contrasena'
							key={form.key('contrasena')}
							{...form.getInputProps('contrasena')}
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
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title='Resultado de la validación'
				centered
			>
				<p>{validationResult?.mensaje}</p>
			</Modal>

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
