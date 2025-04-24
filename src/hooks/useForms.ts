import { useCallback, useState } from "react";
import api from "../../services/api";

interface useFormsOptions<T> {
    endpoint: string;
    method?: 'POST' | 'PUT';
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    initialData?: T;
}

export function useForm<T = any>({
    endpoint, method = 'POST', onSuccess, onError, initialData
}: useFormsOptions<T>) {

    const [data, setData] = useState<T | null>(initialData ?? null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const submit = useCallback(async (formValues: T) => {
        try {
            setLoading(true);
            setError(null);

            const response = await api({
                url: endpoint,
                method,
                data: formValues,
            });

            setData(response.data);
            onSuccess?.(response.data);
        } catch (err: any) {
            setError(err);
            onError?.(err)
        } finally {
            setLoading(false);
        }
    }, [endpoint, method, onSuccess, onError])

    const reset = () => {
        setData(initialData ?? null);
        setError(null);
    }

    return {
        data, error, loading, submit, reset
    }
}