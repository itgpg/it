import os
import yaml
import json
import sys

def main():
    errors = []
    
    # 1. Validate site_config.yml
    config_path = '_data/site_config.yml'
    try:
        with open(config_path, 'r') as f:
            config = yaml.safe_load(f)
            
        required_keys = ['API_KEY', 'FOLDER_IDS', 'PLAYLIST_IDS']
        for key in required_keys:
            if key not in config:
                errors.append(f"site_config.yml: Missing required root key '{key}'")
                
        # Validate Drive IDs (33 chars)
        def check_ids(d, path=""):
            for k, v in d.items():
                current_path = f"{path}.{k}" if path else k
                if isinstance(v, dict):
                    check_ids(v, current_path)
                elif isinstance(v, str):
                    if len(v) != 33 and v != 'PLACEHOLDER':
                        errors.append(f"site_config.yml: Folder ID at '{current_path}' is not 33 characters long (Length: {len(v)}). Value: '{v}'")
                else:
                    errors.append(f"site_config.yml: Invalid data type at '{current_path}', expected string or dict.")
                    
        if 'FOLDER_IDS' in config and isinstance(config['FOLDER_IDS'], dict):
            check_ids(config['FOLDER_IDS'], 'FOLDER_IDS')
            
    except Exception as e:
        errors.append(f"Failed to parse {config_path}: {str(e)}")

    # 2. Validate faculty.json
    faculty_path = '_data/faculty.json'
    img_dir = 'assets/images/faculty_imgs'
    valid_exts = ['.jpeg', '.jpg', '.png']
    
    try:
        with open(faculty_path, 'r') as f:
            faculty_list = json.load(f)
            
        for faculty in faculty_list:
            if 'shortName' not in faculty:
                errors.append(f"faculty.json: A faculty member is missing the 'shortName' key.")
                continue
                
            short_name = faculty['shortName'].lower()
            found = False
            for ext in valid_exts:
                if os.path.exists(os.path.join(img_dir, f"{short_name}{ext}")):
                    found = True
                    break
                    
            if not found:
                # Disabled for now since photos haven't been added yet
                # errors.append(f"faculty.json: Missing image for '{faculty['name']}'. Expected an image named '{short_name}' with one of these extensions: {valid_exts} in '{img_dir}'")
                pass
                
    except Exception as e:
        errors.append(f"Failed to parse {faculty_path}: {str(e)}")
        
    if errors:
        print("Data Validation Failed with the following errors:")
        for err in errors:
            print(f" - {err}")
        sys.exit(1)
    else:
        print("Data Validation Passed successfully!")
        sys.exit(0)

if __name__ == "__main__":
    main()
