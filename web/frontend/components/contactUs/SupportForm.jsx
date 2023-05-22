import { useState, useCallback } from 'react';
import { NoteMinor } from '@shopify/polaris-icons';
import {
	Form,
	FormLayout,
	TextField,
	ButtonGroup,
	Button,
	InlineError,
	LegacyStack,
	DropZone,
	Thumbnail,
	Text,
} from '@shopify/polaris';

import './SupportForm.css';

export const SupportForm = ({ loading, onSubmit }) => {
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [topic, setTopic] = useState('');
	const [description, setDescription] = useState('');
	const [files, setFiles] = useState([]);
	const [isFullNameChanged, setFullNameChanged] = useState(false);
	const [isEmailChanged, setEmailChanged] = useState(false);
	const [isTopicChanged, setTopicChanged] = useState(false);
	const [isDescriptionChanged, setDescriptionChanged] = useState(false);

	const handleSubmit = useCallback(
		async () => {
			setFullNameChanged(true);
			setTopicChanged(true);
			setEmailChanged(true);
			setDescriptionChanged(true);
			try {
				if (!email || !fullName || !topic || !description) return;
				await onSubmit({ fullName, email, topic, description });
				setFullName('');
				setEmail('');
				setTopic('');
				setDescription('');
				setFullNameChanged(false);
				setTopicChanged(false);
				setEmailChanged(false);
				setDescriptionChanged(false);
			} catch (error) {
				console.log(error);
			}
		},
		[fullName, email, topic, description, files]
	);

	const handleFullNameChange = useCallback((value) => {
		setFullNameChanged(true);
		setFullName(value);
	}, []);
	const handleEmailChange = useCallback((value) => {
		setEmailChanged(true);
		setEmail(value);
	}, []);
	const handleTopicChange = useCallback((value) => {
		setTopicChanged(true);
		setTopic(value);
	}, []);
	const handleDescriptionChange = useCallback((event) => {
		setDescriptionChanged(true);
		setDescription(event.currentTarget.value);
	}, []);

	const handleDropZoneDrop = useCallback(
		(_dropFiles, acceptedFiles, _rejectedFiles) =>
			setFiles((files) => [...files, ...acceptedFiles]),
		[]
	);

	const requiredValidation = (isChanged, value, title) => {
		if (!isChanged) return '';
		if (!value) return title;
		return '';
	};

	const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

	const fileUpload = !files.length && (
		<DropZone.FileUpload actionHint="Accepts .gif, .jpg, and .png" />
	);
	const uploadedFiles = files.length > 0 && (
		<LegacyStack vertical>
			{files.map((file, index) => (
				<LegacyStack alignment="center" key={index}>
					<Thumbnail
						size="small"
						alt={file.name}
						source={
							validImageTypes.includes(file.type)
								? window.URL.createObjectURL(file)
								: NoteMinor
						}
					/>
					{file.name}{' '}
					<Text variant="bodySm" as="p">
						{file.size} bytes
					</Text>
				</LegacyStack>
			))}
		</LegacyStack>
	);

	return (
		<Form onSubmit={handleSubmit}>
			<FormLayout>
				<TextField
					value={fullName}
					onChange={handleFullNameChange}
					label="Full name"
					type="text"
					autoComplete="off"
					error={requiredValidation(
						isFullNameChanged,
						fullName,
						'Full name is required'
					)}
					disabled={loading}
				/>
				<TextField
					value={email}
					onChange={handleEmailChange}
					label="Your Email"
					type="email"
					autoComplete="email"
					error={requiredValidation(isEmailChanged, email, 'Email is required')}
					disabled={loading}
				/>
				<TextField
					value={topic}
					onChange={handleTopicChange}
					label="Topic"
					type="text"
					autoComplete="off"
					error={requiredValidation(isTopicChanged, topic, 'Topic is required')}
					disabled={loading}
				/>
				<LegacyStack vertical spacing="none">
					<textarea
						value={description}
						onChange={handleDescriptionChange}
						id="supportDescriptionID"
						className="form_textarea"
						disabled={loading}
					/>
					{Boolean(
						requiredValidation(
							isDescriptionChanged,
							description,
							'Description is required'
						)
					) && (
						<InlineError
							message="Description is required"
							fieldID="supportDescriptionID"
						/>
					)}
				</LegacyStack>
				<ButtonGroup fullWidth>
					<Button loading={loading} submit primary>
						Submit
					</Button>
				</ButtonGroup>
			</FormLayout>
		</Form>
	);
};
