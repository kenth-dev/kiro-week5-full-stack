export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      crafts: {
        Row: {
          correct_answer: number
          created_at: string
          description: string
          id: string
          image_url: string | null
          interesting_fact: string | null
          island_group: string
          name: string
          options: Json
          province: string
          question: string
          region: string
          short_description: string
          slug: string
          stamp_image_url: string | null
          stamp_name: string
          ubra_url: string | null
        }
        Insert: {
          correct_answer: number
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          interesting_fact?: string | null
          island_group: string
          name: string
          options: Json
          province: string
          question: string
          region: string
          short_description: string
          slug: string
          stamp_image_url?: string | null
          stamp_name: string
          ubra_url?: string | null
        }
        Update: {
          correct_answer?: number
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          interesting_fact?: string | null
          island_group?: string
          name?: string
          options?: Json
          province?: string
          question?: string
          region?: string
          short_description?: string
          slug?: string
          stamp_image_url?: string | null
          stamp_name?: string
          ubra_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          completed_at: string
          craft_id: string
          id: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          craft_id: string
          id?: string
          user_id: string
        }
        Update: {
          completed_at?: string
          craft_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_craft_id_fkey"
            columns: ["craft_id"]
            isOneToOne: false
            referencedRelation: "crafts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      unlock_craft: {
        Args: { p_answer: number; p_craft_id: string }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
