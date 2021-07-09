import { ChangeEvent, FormEvent } from 'react';
export declare function useForm<T>(data: T, fetchFn?: () => Promise<any>): {
    formData: T;
    isLoaded: boolean;
    isSendingForm: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>, fn?: (data: T) => Promise<void> | void) => void;
    onSubmit: (e: FormEvent<HTMLInputElement>, fn: () => Promise<void> | void) => Promise<void>;
    error: Error;
};
