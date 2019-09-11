export interface Artist {
  id: number;
  name: string;
  genre: string;
  web_url: string;
  youtube_url: string;
  twitter_url: string;
  instagram_url: string;
  facebook_url: string;
  image_path: string;
  profile_text: string;
  stage_ids: number[];
  stage1_name: string;
  stage1_date_at: string;
  stage2_name: string;
  stage2_date_at: string;
  stages: { stage_name: string, stage_date_at: string }[];
}
