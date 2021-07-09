import { useEffect, useState, ChangeEvent, FormEvent } from 'react';

export function useForm<T>(data: T, fetchFn?: () => Promise<any>) {
    const [formData, setFormData] = useState<T>(data);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSendingForm, setIsSendingForm] = useState(false);
    const [error, setError] = useState<Error>(null);

    const onChange = (e: ChangeEvent<HTMLInputElement>, fn?: (data: T) => Promise<void> | void) => {
        const { name, value, checked, type } = e.target;

        setFormData((prev) => {
            const next = { ...prev, [name]: type === 'checkbox' ? checked : value };

            if (fn) fn(next);

            return next;
        });
    };

    const onSubmit = async (e: FormEvent<HTMLInputElement>, fn: () => Promise<void> | void) => {
        e.preventDefault();
        setIsSendingForm(true);

        try {
            await fn();
        } catch (e) {
            setError(e);
        } finally {
            setIsSendingForm(false);
        }
    };

    useEffect(() => {
        if (fetchFn) {
            (async () => {
                const data = await fetchFn();

                try {
                    setFormData(data);
                } catch (e) {
                    setError(e);
                } finally {
                    setIsLoaded(true);
                }
            })();
        }
    }, []);

    return { formData, isLoaded, isSendingForm, onChange, onSubmit, error };
}
