/**
 * Firebase Functions Client Utilities
 *
 * This file provides client-side functions to interact with Firebase Functions
 * for survey data collection from your React application.
 */

// Types for survey data collection
export interface SurveyData {
  country: string
  age: string
  job: string
  belief: string
  action?: string
}

// Firebase Functions base URL (will be replaced with actual URL after deployment)
const FUNCTIONS_BASE_URL = 'https://us-central1-sai-ya-sat.cloudfunctions.net'

/**
 * Submit survey data to Firebase Functions
 */
export const submitSurvey = async (
  data: SurveyData
): Promise<{ success: boolean; surveyId?: string; error?: string }> => {
  try {
    const response = await fetch(`${FUNCTIONS_BASE_URL}/submitSurvey`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()
    return result
  } catch {
    return {
      success: false,
      error: 'Failed to submit survey',
    }
  }
}
