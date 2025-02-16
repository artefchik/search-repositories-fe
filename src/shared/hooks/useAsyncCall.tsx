import {useState, useCallback} from 'react';

type AsyncStatus = 'loading' | 'success' | 'error';

interface FunctionCallState {
    id: string;
    status: AsyncStatus;
}

type ReturnPromiseType<T extends (...args: any[]) => Promise<any>> =
    T extends (...args: any[]) => Promise<infer R> ? R : never;

export function useAsyncCall<GetData extends (...args: Parameters<GetData>) => Promise<ReturnPromiseType<GetData>>>(
    asyncFunction: GetData,
): [AsyncStatus | undefined, (...args: Parameters<GetData>) => Promise<ReturnPromiseType<GetData>>] {
    const [functionCallState, setFunctionCallState] = useState<FunctionCallState | null>(null);

    const asyncCall = useCallback(
        async (...args: Parameters<GetData>): Promise<ReturnPromiseType<GetData>> => {
            const callId = crypto.randomUUID();

            try {
                setFunctionCallState({id: callId, status: 'loading'});
                const data = await asyncFunction(...args);
                setFunctionCallState((currentFunctionCallState) => {
                    if (currentFunctionCallState?.id === callId) {
                        return {id: callId, status: 'success'};
                    }
                    return currentFunctionCallState;
                });
                return data;
            } catch (error) {
                setFunctionCallState((currentFunctionCallState) => {
                    if (currentFunctionCallState?.id === callId) {
                        return {id: callId, status: 'error'};
                    }
                    return currentFunctionCallState;
                });
                throw error;
            }
        },
        [asyncFunction],
    );

    return [functionCallState?.status, asyncCall]
}
