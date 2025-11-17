/**
 * Vercel Serverless Function (Node.js)
 * This file is saved in the 'api/' directory of your project (e.g., in a Next.js or standard Vercel setup).
 *
 * Endpoint: /api/enroll
 * Method: POST
 */

// This function handles the incoming request
export default async function handler(req, res) {
    // 1. Check if the request method is POST
    if (req.method !== 'POST') {
        // Send a 405 Method Not Allowed response if it's not POST
        return res.status(405).json({ message: 'Method not allowed. Use POST.' });
    }

    try {
        // 2. Extract the data from the request body
        const enrollmentData = req.body;

        // 3. Simple Validation (You would add more rigorous validation here)
        if (!enrollmentData || !enrollmentData.fullName || !enrollmentData.email) {
            return res.status(400).json({ message: 'Missing required fields (fullName and email).' });
        }

        // --- 4. Database Interaction (THIS IS WHERE YOU'D CONNECT TO FIRESTORE, etc.) ---
        
        // For demonstration, we'll just log the data and simulate a successful save.
        console.log("--- Received Enrollment Submission ---");
        console.log(`Student: ${enrollmentData.fullName}`);
        console.log(`Email: ${enrollmentData.email}`);
        console.log("Full Data:", enrollmentData);
        console.log("--------------------------------------");
        
        // In a real application, you would:
        // const savedRecord = await db.collection('enrollments').add(enrollmentData);
        
        // 5. Send a successful response back to the React frontend
        res.status(200).json({
            message: 'Enrollment successful!',
            studentName: enrollmentData.fullName,
            // id: savedRecord.id // Include the ID from the database
        });

    } catch (error) {
        console.error('Error handling enrollment submission:', error);
        res.status(500).json({ message: 'Internal Server Error', detail: error.message });
    }
}