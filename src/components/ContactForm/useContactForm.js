import { useEffect, useState, useImperativeHandle } from 'react';
import isValidEmail from '../../utils/IsValidEmail';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErros';
import CategoriesService from '../../services/CategoriesService';

export default function useContactForm(onSubmit, ref) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);
  const { errors, setError, removeError, getErroMessageByFieldName } =
    useErrors();
  const isFormInvalid = name && errors.length === 0;

  useImperativeHandle(ref, () => {
    return {
      setFieldsValues: contact => {
        setName(contact.name ?? '');
        setEmail(contact.email ?? '');
        setPhone(formatPhone(contact.phone) ?? '');
        setCategoryId(contact.category.id ?? '');
      },
      resetFields: () => {
        setName('');
        setEmail('');
        setPhone('');
        setCategoryId('');
      },
    };
  }, []);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();
        setCategories(categoriesList);
      } catch {
      } finally {
        setIsLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

  function handleNameChange(e) {
    setName(e.target.value);
    if (!e.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);

    if (e.target.value && !isValidEmail(e.target.value)) {
      setEmail(e.target.value);
      setError({ field: 'email', message: 'Email é obrigatório' });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange(e) {
    setPhone(formatPhone(e.target.value));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    await onSubmit({ name, phone, categoryId, email });
    setSubmitting(false);
  }

  return {
    handleSubmit,
    getErroMessageByFieldName,
    name,
    handleNameChange,
    isSubmitting,
    handleEmailChange,
    phone,
    handlePhoneChange,
    isLoadingCategories,
    categoryId,
    categories,
    setCategoryId,
    isFormInvalid,
    email,
  };
}
