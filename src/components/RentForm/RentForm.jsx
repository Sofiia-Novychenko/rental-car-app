import DatePicker from 'react-datepicker';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import css from './RentForm.module.css';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import toast, { Toaster } from 'react-hot-toast';

function RentForm() {
  const [selectedDate, setSelectedDate] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      comment: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, 'Too short!')
        .max(16, 'Too long!')
        .required('This field is required'),
      email: Yup.string()
        .email('Invalid email')
        .max(128, 'Too long!')
        .required('This field is required'),
    }),
    onSubmit: values => {
      if (!selectedDate) {
        toast('Please select a booking date!', {
          icon: '🕓︎',
        });
        return;
      }
      const bookingData = { ...values, date: selectedDate };

      console.log('Booking data from RentForm:', bookingData);

      toast.success('Your booking request has been successfully submitted!', {
        duration: 5000,
      });
      formik.resetForm();
      setSelectedDate(null);
    },
  });
  return (
    <div className={css.formWrapper}>
      <Toaster position="top-right" reverseOrder={false} />
      <h3>Book your car now</h3>
      <p>Stay connected! We are always ready to help you.</p>
      <form className={css.form} onSubmit={formik.handleSubmit}>
        <div className={css.inputWrapper}>
          <input
            type="text"
            name="name"
            placeholder="Name*"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div className={css.inputError}>{formik.errors.name}</div>
          )}
        </div>
        <div className={css.inputWrapper}>
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className={css.inputError}>{formik.errors.email}</div>
          )}
        </div>
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          placeholderText="Booking date"
        />
        <textarea
          name="comment"
          rows=""
          placeholder="Comment"
          value={formik.values.comment}
          onChange={formik.handleChange}
        />
        <button type="submit" className={` blueBtn ${css.formBtn}`}>
          Send
        </button>
      </form>
    </div>
  );
}

export default RentForm;
