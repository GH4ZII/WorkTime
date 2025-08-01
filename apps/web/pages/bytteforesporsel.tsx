import React, { useState, useEffect } from "react";
import {NextPage} from "next";
import { Layout } from '../components/Layout';
import axios from 'axios';

interface ShiftSwapRequest {
    id: string;
    requestedById: string;
    fromShiftId: string;
    swapType: string;
    swapWithId: string;
    toShiftId: string;
}

const ShiftSwapPage: NextPage = () => {
    const [swapRequests, setSwapRequests] = useState<ShiftSwapRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchSwapRequests();
    }, []);

    const fetchSwapRequests = async () => {
        try {
            setLoading(true);
            const response = await axios.get<ShiftSwapRequest[]>('http://10.129.48.163:3001/shift-swap-requests', {
                withCredentials: true
            });
            setSwapRequests(response.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (requestId: string) => {
        try {
            await axios.post(`http://10.129.48.163:3001/shift-swap-requests/${requestId}/approve`, {}, {
                withCredentials: true
            });
            fetchSwapRequests();
        } catch (err: any) {
            setError(err.message);
        }
    }

    const handleReject = async (requestId: string) => {
        try {
            await axios.post(`http://10.129.48.163:3001/shift-swap-requests/${requestId}/reject`, {}, {
                withCredentials: true
            });
            fetchSwapRequests();
        } catch (err: any) {
        setError(err.message);
    }
}


    return (
        <Layout>
            <h1>Under Development</h1>
        </Layout>
    );
}

export default ShiftSwapPage;
