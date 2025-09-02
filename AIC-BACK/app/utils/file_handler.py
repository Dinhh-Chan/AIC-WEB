import os
import uuid
import shutil
from typing import Optional
from pathlib import Path
from fastapi import UploadFile
from app.utils.exception_handler import CustomException, ExceptionType


class FileHandler:
    def __init__(self, base_data_path: str = None):
        # Sử dụng đường dẫn tương đối nếu không có đường dẫn được cung cấp
        if base_data_path is None:
            # Đường dẫn tương đối từ thư mục hiện tại của ứng dụng
            import os
            current_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            base_data_path = os.path.join(current_dir, "data")
        self.base_data_path = Path(base_data_path)
        # Đảm bảo thư mục data tồn tại
        self.base_data_path.mkdir(parents=True, exist_ok=True)
        self.allowed_extensions = {
            'report': ['.pdf', '.doc', '.docx'],
            'slide': ['.pdf', '.ppt', '.pptx'],
            'video': ['.mp4', '.avi', '.mov', '.wmv'],
        }
        self.max_file_size = 50 * 1024 * 1024  # 50MB
    
    def _validate_file(self, file: UploadFile, file_type: str) -> None:
        """Validate uploaded file"""
        if not file.filename:
            raise "File name is not valid"
        
        # Check file extension
        file_ext = Path(file.filename).suffix.lower()
        # if file_type in self.allowed_extensions:
        #     if file_ext not in self.allowed_extensions[file_type]:
        #         raise f"File extension {file_ext} is not allowed for {file_type}"
        
        # Check file size
        if hasattr(file, 'size') and file.size and file.size > self.max_file_size:
            raise f"File size is too large"
    
    def _create_team_directory(self, team_id: int) -> Path:
        """Create team directory if it doesn't exist"""
        team_dir = self.base_data_path / f"team_{team_id}"
        team_dir.mkdir(parents=True, exist_ok=True)
        return team_dir
    
    def _generate_unique_filename(self, original_filename: str) -> str:
        """Generate unique filename to avoid conflicts"""
        file_ext = Path(original_filename).suffix
        unique_name = f"{uuid.uuid4().hex}{file_ext}"
        return unique_name
    
    async def save_submission_file(
        self, 
        file: UploadFile, 
        team_id: int, 
        file_type: str
    ) -> str:
        """
        Save uploaded file to team directory
        Returns relative path from data directory
        """
        try:
            # Validate file
            self._validate_file(file, file_type)
            
            # Create team directory
            team_dir = self._create_team_directory(team_id)
            
            # Use team directory directly
            file_dir = team_dir
            
            # Generate unique filename
            unique_filename = self._generate_unique_filename(file.filename)
            
            # Full file path
            file_path = file_dir / unique_filename
            
            # Print debug info
            print(f"Saving file to: {file_path}")
            print(f"File directory exists: {file_dir.exists()}")
            
            # Make sure directory exists
            file_dir.mkdir(parents=True, exist_ok=True)
            
            # Save file
            with open(file_path, "wb") as buffer:
                content = await file.read()
                buffer.write(content)
                
            # Verify file was saved
            print(f"File saved successfully: {file_path.exists()}")
            
            # Return relative path from data directory
            relative_path = f"team_{team_id}/{unique_filename}"
            return relative_path
            
        except Exception as e:
            print(f"Error saving file: {str(e)}")
            # Print the file path for debugging
            print(f"Attempted to save file to: {file_path}")
            # Print directory existence
            print(f"Directory exists: {file_dir.exists()}")
            # Print directory permissions
            print(f"Directory permissions: {oct(os.stat(file_dir).st_mode)}")
            raise CustomException(exception=ExceptionType.INTERNAL_SERVER_ERROR, detail=f"Error saving file: {str(e)}")
    
    def delete_file(self, file_path: str) -> bool:
        """Delete file from storage"""
        try:
            full_path = self.base_data_path / file_path
            if full_path.exists():
                full_path.unlink()
                return True
            return False
        except Exception:
            return False
    
    def get_file_path(self, relative_path: str) -> Path:
        """Get full file path from relative path"""
        return self.base_data_path / relative_path
    
    def file_exists(self, relative_path: str) -> bool:
        """Check if file exists"""
        return self.get_file_path(relative_path).exists()


# Global instance
file_handler = FileHandler()
