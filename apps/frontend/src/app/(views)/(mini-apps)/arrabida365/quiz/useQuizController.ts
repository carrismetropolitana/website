/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import {
	calculateResult,
	getResultSharePath,
	PersonalityResult,
	questions,
} from './data';

type Screen = 'afterShare' | 'loading' | 'question' | 'result' | 'start';

export function useQuizController() {
	const [screen, setScreen] = useState<Screen>('start');
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answers, setAnswers] = useState<string[]>([]);
	const [selectedAnswer, setSelectedAnswer] = useState<string>('');
	const [result, setResult] = useState<null | PersonalityResult>(null);
	const [showConfetti, setShowConfetti] = useState(false);
	const [shareMessage, setShareMessage] = useState<string>('');
	const [isSharing, setIsSharing] = useState(false);

	const handleStart = () => {
		setScreen('question');
		setCurrentQuestion(0);
		setAnswers([]);
		setSelectedAnswer('');
	};

	const handleAnswerSelect = (value: string) => {
		setSelectedAnswer(value);
	};

	const handleNext = () => {
		if (!selectedAnswer) return;

		const newAnswers = [...answers, selectedAnswer];
		setAnswers(newAnswers);
		setSelectedAnswer('');

		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
			setTimeout(() => {
				window.scrollTo({ behavior: 'smooth', top: 0 });
			}, 0);
		}
		else {
			setScreen('loading');
			setTimeout(() => {
				const calculatedResult = calculateResult(newAnswers);
				setResult(calculatedResult);
				setScreen('result');
				setShowConfetti(true);
				setTimeout(() => setShowConfetti(false), 4000);
			}, 3000);
		}
	};

	const handleBack = () => {
		if (currentQuestion > 0) {
			setCurrentQuestion(currentQuestion - 1);
			const newAnswers = [...answers];
			const previousAnswer = newAnswers.pop();
			setAnswers(newAnswers);
			setSelectedAnswer(previousAnswer || '');
			window.scrollTo({ behavior: 'smooth', top: 0 });
		}
	};

	const copyToClipboard = async (text: string): Promise<boolean> => {
		if (navigator.clipboard && window.isSecureContext) {
			try {
				await navigator.clipboard.writeText(text);
				return true;
			}
			catch (err) {
				console.error('Clipboard API failed:', err);
			}
		}

		const textArea = document.createElement('textarea');
		textArea.value = text;
		textArea.style.position = 'fixed';
		textArea.style.left = '-9999px';
		textArea.style.top = '0';
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		try {
			const successful = document.execCommand('copy');
			document.body.removeChild(textArea);
			return successful;
		}
		catch (error) {
			console.error('Clipboard API failed:', error);
			document.body.removeChild(textArea);
			return false;
		}
	};

	const handleShare = async () => {
		if (!result || isSharing) return;

		const shareUrl = `${window.location.origin}${getResultSharePath(result.letter)}`;

		const shareData = {
			text: 'Descobri o meu perfil de passageiro da Arrábida 365. Faz tu também o quiz.',
			title: 'Quiz Arrábida 365',
			url: shareUrl,
		};

		if (navigator.share) {
			try {
				setIsSharing(true);
				await navigator.share(shareData);
				setScreen('afterShare');
			}
			catch (err: any) {
				if (err?.name !== 'AbortError' && err?.name !== 'InvalidStateError') {
					console.error('Error sharing:', err);
				}
			}
			finally {
				setIsSharing(false);
			}

			return;
		}

		const copied = await copyToClipboard(shareUrl);

		if (copied) {
			setShareMessage('Link copiado!');
		}
		else {
			setShareMessage('Não foi possível copiar o link.');
		}

		setTimeout(() => setShareMessage(''), 3000);
	};

	const handleCopyLink = async () => {
		if (!result) return;

		const shareUrl = `${window.location.origin}${getResultSharePath(result.letter)}`;

		const copied = await copyToClipboard(shareUrl);

		if (copied) {
			setShareMessage('Link copiado!');
		}
		else {
			setShareMessage('Não foi possível copiar o link.');
		}

		setTimeout(() => setShareMessage(''), 3000);
	};

	const handleRestart = () => {
		setScreen('start');
		setCurrentQuestion(0);
		setAnswers([]);
		setSelectedAnswer('');
		setResult(null);
	};

	const progress = ((currentQuestion + 1) / questions.length) * 100;
	const currentQ = questions[currentQuestion];

	return {
		currentQ,
		currentQuestion,
		handleAnswerSelect,
		handleBack,
		handleCopyLink,
		handleNext,
		handleRestart,
		handleShare,
		handleStart,
		isSharing,
		progress,
		result,
		screen,
		selectedAnswer,
		setScreen,
		shareMessage,
		showConfetti,
	};
}
