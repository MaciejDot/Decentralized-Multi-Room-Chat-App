import React, { useReducer, useState } from "react"

export type Action<T extends Record<string, any>> =
    {
        [TKey in keyof T]:
        {
            name: TKey,
            value: T[TKey]
        }
    }[keyof T] | 'reset'

export type ValidationResult<T> = {
    [TKey in keyof T]?: string
}

export const useForm = <T extends Record<string, any>>(
    initialState: T,
    submitAction: () => any = () => { },
    initialValidation: ValidationResult<T> = {},
    validator: (state: T) => Promise<ValidationResult<T>> = async () => ({}),
    isSubmiting: boolean = false,
    setIsSubmiting: (isSubmiting: boolean) => any = () => { }
) => {
    const formReducer = (state: T = initialState, action: Action<T>) =>
        action === 'reset' ?
            initialState :
            ({
                ...state,
                [action.name]: action.value
            })

    const [formState, dispatchFormAction] = useReducer(formReducer, initialState)

    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => 
    {
        dispatchFormAction({ name: event.target.name, value: event.target.value } as any)}

    const [validation, setValidation] = useState(initialValidation)

    const [isValidating, setIsValidating] = useState(false)

    const onSubmit: React.FormEventHandler = async (event) => {
        event.preventDefault()
        if (isSubmiting || isValidating)
            return;
        setIsSubmiting(true)
        setIsValidating(true)
        try {
            
            setValidation(await validator(formState));
            if (Object.keys(validation).length) {
                return
            }

            submitAction()
        }
        catch{
            setIsSubmiting(false)
        }
        finally {
            setIsValidating(false)
        }
    }

    const resetFormState = () => dispatchFormAction('reset')

    const inputPropsMap = (name : keyof T) => ({
        name,
        value: formState[name],
        onChange: onInputChange,
        error: !!validation[name],
        helperText: validation[name],
        disabled: isSubmiting
    })



    return { formState, resetFormState, dispatchFormAction, onInputChange, validation, setValidation, onSubmit,inputPropsMap }
}