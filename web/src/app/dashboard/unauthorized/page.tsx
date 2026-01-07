
import Link from "next/link";
// Removed currentUser import

export default async function UnauthorizedPage() {
    // We could get session here if we wanted to show the email, 
    // but for simplicity just show the message.
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-gray-50 p-4">
            <div className="rounded-lg border bg-white p-8 text-center shadow-lg">
                <h1 className="mb-2 text-2xl font-bold text-red-600">Restricted Area</h1>
                <p className="mb-4 text-gray-600">Access Denied</p>
                <p className="mb-6 text-sm text-gray-500">
                    You are not authorized to access this dashboard.
                </p>
                <Link
                    href="/"
                    className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
                >
                    Return Home
                </Link>
            </div>
        </div>
    );
}
