"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/supabase-js"

export const useSupabaseAuth = () => {
  const [supabase] = useState(() => createClientComponentClient())
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    }

    loadSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const signIn = async (email, password) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
    } catch (error) {
      console.error("Error signing in:", error)
      throw error
    }
  }

  const signUp = async (email, password, options) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: options,
        },
      })
      if (error) throw error
    } catch (error) {
      console.error("Error signing up:", error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error("Error signing out:", error)
      throw error
    }
  }

  return { supabase, session, user, loading, signIn, signUp, signOut }
}

export const getCurrentUser = () => {
  if (typeof window === "undefined") {
    return null
  }

  try {
    const storedUser = localStorage.getItem("supabase.auth.token")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      return parsedUser?.currentSession?.user || null
    }
    return null
  } catch (error) {
    console.error("Error getting current user from localStorage:", error)
    return null
  }
}

export const signOut = async () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("supabase.auth.token")
  }
}
