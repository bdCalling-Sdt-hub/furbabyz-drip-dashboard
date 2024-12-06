import { Button } from 'antd';
import { useState } from 'react';
import {
    useDeleteAllNotificationsMutation,
    useGetAllNotificationQuery,
} from '../../redux/features/notification/notificationApi';
import Loading from '../../components/shared/Loading';
import { da } from 'date-fns/locale';

const Notification = () => {
    const [page, setPage] = useState(1); // Current page state
    const itemsPerPage = 10; // Number of items per page

    // Always call hooks at the top level
    const { data, isLoading } = useGetAllNotificationQuery({
        page,
        limit: itemsPerPage,
    });

    const [deleteNotification, { isLoading: isDeleting }] = useDeleteAllNotificationsMutation();

    const handleDeleteAllNotifications = async () => {
        try {
            await deleteNotification({}).unwrap();
            // Optionally, trigger UI updates or show a success message
        } catch (error) {
            console.error('Error deleting notifications:', error);
            // Handle failure (e.g., show an error message)
        }
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage); // Update the page number
    };

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    return (
        <div className="mt-5">
            <div className="bg-white p-5 rounded-xl shadow-lg">
                <div className="flex items-center justify-between my-4">
                    <h1 className="text-2xl font-semibold text-primary">Notification</h1>
                    <Button
                        onClick={handleDeleteAllNotifications}
                        className="h-10 bg-white text-primary font-normal text-sm border border-primary rounded-lg"
                        loading={isDeleting} // Shows loading spinner when deleting
                    >
                        <span>Delete all</span>
                    </Button>
                </div>
                <div>
                    {data?.data?.map((item: any, index: number) => {
                        return (
                            <div key={index} className="w-full mx-auto p-4 my-4 min-h-20 bg-white shadow-md rounded-md">
                                <div className="text-sm">
                                    <div className="flex items-center gap-5">
                                        <p className="font-semibold text-[#555555]">{item?.text}</p>
                                        <div className="flex justify-between items-center gap-5 text-[#A7A7A7]">
                                            <span className="text-xs">{item?.createdAt.slice(0, 10)}</span>
                                            <span className="text-xs">{item?.createdAt.slice(11, 16)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center mt-4">
                    <Button className="mr-2" onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
                        Previous
                    </Button>
                    <span className="text-sm text-gray-500">{`Page ${page}`}</span>
                    <Button className="ml-2" onClick={() => handlePageChange(page + 1)} disabled={data?.meta?.nextPage}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Notification;
