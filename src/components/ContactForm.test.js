import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.queryByText('Contact Form')
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toContainHTML('Contact Form');
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstNameInput = screen.getByLabelText('First Name*')
    userEvent.type(firstNameInput, 'name')
    const errorMessage = await screen.findByText('Error: firstName must have at least 5 characters.')
    expect(errorMessage).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole('button')
    userEvent.click(submitButton)

    const errorMessage = await screen.findByText('Error: firstName must have at least 5 characters.')
    const errorMessage2 = await screen.findByText('Error: lastName is a required field.')
    const errorMessage3 = await screen.findByText('Error: email must be a valid email address.')
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage2).toBeInTheDocument();
    expect(errorMessage3).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole('button')
    const firstNameInput = screen.getByLabelText('First Name*')
    userEvent.type(firstNameInput, 'firstname')
    const lasNameInput = screen.getByLabelText('Last Name*')
    userEvent.type(lasNameInput, 'lastname')

    userEvent.click(submitButton)

    const errorMessage = await screen.findByText('Error: email must be a valid email address.')
    expect(errorMessage).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const emailInput = screen.getByLabelText('Email*')
    userEvent.type(emailInput, 'invalidemail')

    const errorMessage = await screen.findByText('Error: email must be a valid email address.')
    expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole('button')
    const firstNameInput = screen.getByLabelText('First Name*')
    userEvent.type(firstNameInput, 'firstname')
    const emailInput = screen.getByLabelText('Email*')
    userEvent.type(emailInput, 'email@email.com')

    userEvent.click(submitButton)

    const errorMessage = await screen.findByText('Error: lastName is a required field.')
    expect(errorMessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole('button')
    const firstNameInput = screen.getByLabelText('First Name*')
    userEvent.type(firstNameInput, 'firstname')
    const lastNameInput = screen.getByLabelText('Last Name*')
    userEvent.type(lastNameInput, 'lastname')
    const emailInput = screen.getByLabelText('Email*')
    userEvent.type(emailInput, 'email@email.com')

    userEvent.click(submitButton)

    const submittedHeader = await screen.findByText('You Submitted:')
    const firstName = await screen.findByText('firstname')
    const lastName = await screen.findByText('lastname')
    const email = await screen.findByText('email@email.com')

    expect(submittedHeader).toBeInTheDocument();
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole('button')
    const firstNameInput = screen.getByLabelText('First Name*')
    userEvent.type(firstNameInput, 'firstname')
    const lastNameInput = screen.getByLabelText('Last Name*')
    userEvent.type(lastNameInput, 'lastname')
    const emailInput = screen.getByLabelText('Email*')
    userEvent.type(emailInput, 'email@email.com')
    const messageInput = screen.getByLabelText('Message')
    userEvent.type(messageInput, 'this is a message')

    userEvent.click(submitButton)

    const submittedHeader = await screen.findByText('You Submitted:')
    const firstName = await screen.findByText('First Name:')
    const lastName = await screen.findByText('Last Name:')
    const email = await screen.findByText('Email:')
    const message = await screen.findByText('Message:')

    expect(submittedHeader).toBeInTheDocument();
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(message).toBeInTheDocument();
});