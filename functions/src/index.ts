/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { onRequest } from 'firebase-functions/v2/https'

// Initialize Firebase Admin
initializeApp()

// Initialize Firestore
const db = getFirestore('surveys')

type SurveyData = {
  uid: string
  country: string
  age: string
  job: string
  belief: string
  action?: string
}

export const submitSurvey = onRequest(
  {
    cors: ['https://sai-ya-sat.web.app', 'https://sai-ya-sat.firebaseapp.com'],
  },
  async (request, response) => {
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    response.setHeader('Access-Control-Allow-Credentials', 'true')

    const data = request.body as SurveyData

    // Basic validation
    if (!data.country || !data.age || !data.job || !data.belief) {
      throw new Error('Missing required fields')
    }

    const collection = db.collection('survey_results')

    const doc = await collection.where('uid', '==', data.uid).get()
    if (doc) {
      response.send({
        success: false,
        error: 'Survey already exists',
      })
      return
    }

    // Save to Firestore
    const docRef = await collection.add({
      ...data,
      id: data.uid,
      timestamp: new Date(),
    })

    response.send({
      success: true,
      surveyId: docRef.id,
    })
  }
)
