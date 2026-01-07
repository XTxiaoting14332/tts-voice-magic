var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// index.js
var TOKEN_REFRESH_BEFORE_EXPIRY = 3 * 60;
var tokenInfo = {
  endpoint: null,
  token: null,
  expiredAt: null
};
var HTML_PAGE = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title data-i18n="page.title">VoiceCraft - AI-Powered Voice Processing Platform</title>
    <meta name="description" content="" data-i18n-content="page.description">
    <meta name="keywords" content="" data-i18n-content="page.keywords">
    <style>
        :root {
            --primary-color: #2563eb;
            --primary-hover: #1d4ed8;
            --secondary-color: #64748b;
            --success-color: #059669;
            --warning-color: #d97706;
            --error-color: #dc2626;
            --background-color: #f8fafc;
            --surface-color: #ffffff;
            --text-primary: #0f172a;
            --text-secondary: #475569;  
            --border-color: #e2e8f0;
            --border-focus: #3b82f6;
            --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            --radius-sm: 6px;
            --radius-md: 8px;
            --radius-lg: 12px;
            --radius-xl: 16px;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: var(--background-color);
            color: var(--text-primary);
            line-height: 1.6;
            min-height: 100vh;
        }
        
        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            background: var(--surface-color);
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-lg);
            padding: 40px 30px;
            text-align: center;
            margin-bottom: 30px;
            border: 1px solid var(--border-color);
        }
        
        .header h1 {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--primary-color);
            margin-bottom: 12px;
            letter-spacing: -0.025em;
        }
        
        .header .subtitle {
            font-size: 1.125rem;
            color: var(--text-secondary);
            margin-bottom: 20px;
            font-weight: 500;
        }
        
        .header .features {
            display: flex;
            justify-content: center;
            gap: 30px;
            flex-wrap: wrap;
            margin-top: 20px;
        }
        
        .feature-item {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--text-secondary);
            font-size: 0.875rem;
            font-weight: 500;
        }
        
        .feature-icon {
            width: 20px;
            height: 20px;
            color: var(--success-color);
        }
        
        .main-content {
            background: var(--surface-color);
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-lg);
            border: 1px solid var(--border-color);
            overflow: hidden;
        }
        
        .form-container {
            padding: 40px;
        }
        
        .form-group {
            margin-bottom: 24px;
        }
        
        .form-label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: var(--text-primary);
            font-size: 0.875rem;
        }
        
        .form-input, .form-select, .form-textarea {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid var(--border-color);
            border-radius: var(--radius-md);
            font-size: 16px;
            color: var(--text-primary);
            background: var(--surface-color);
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .form-input:focus, .form-select:focus, .form-textarea:focus {
            outline: none;
            border-color: var(--border-focus);
            box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
        }
        
        .form-textarea {
            min-height: 120px;
            resize: vertical;
            font-family: inherit;
        }
        
        .controls-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 20px;
            margin-bottom: 32px;
        }
        
        .btn-primary {
            width: 100%;
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 16px 32px;
            font-size: 16px;
            font-weight: 600;
            border-radius: var(--radius-md);
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .btn-primary:hover:not(:disabled) {
            background: var(--primary-hover);
            transform: translateY(-1px);
            box-shadow: var(--shadow-md);
        }
        
        .btn-primary:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
        
        .btn-secondary {
            background: var(--success-color);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: var(--radius-md);
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-weight: 500;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .btn-secondary:hover {
            background: #047857;
            transform: translateY(-1px);
        }
        
        .result-container {
            margin-top: 32px;
            padding: 24px;
            background: var(--background-color);
            border-radius: var(--radius-lg);
            border: 1px solid var(--border-color);
            display: none;
        }
        
        .audio-player {
            width: 100%;
            margin-bottom: 16px;
            border-radius: var(--radius-md);
        }
        
        .error-message {
            color: var(--error-color);
            background: #fef2f2;
            border: 1px solid #fecaca;
            padding: 16px;
            border-radius: var(--radius-md);
            margin-top: 16px;
            font-weight: 500;
        }
        
        .loading-container {
            text-align: center;
            padding: 32px 20px;
        }
        
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid var(--border-color);
            border-top: 3px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 16px;
        }
        
        .loading-text {
            color: var(--text-secondary);
            font-weight: 500;
        }
        
        .wechat-promotion {
            margin-top: 40px;
            background: var(--surface-color);
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-md);
            border: 1px solid var(--border-color);
            overflow: hidden;
        }
        
        .promotion-header {
            background: #f1f5f9;
            padding: 20px 30px;
            border-bottom: 1px solid var(--border-color);
        }
        
        .promotion-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 8px;
        }
        
        .promotion-subtitle {
            color: var(--text-secondary);
            font-size: 0.875rem;
        }
        
        .promotion-content {
            padding: 30px;
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 24px;
            align-items: center;
        }
        
        .qr-code {
            width: 120px;
            height: 120px;
            border: 2px solid var(--border-color);
            border-radius: var(--radius-lg);
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .qr-code img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .promotion-info h3 {
            font-size: 1.125rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 12px;
        }
        
        .promotion-info p {
            color: var(--text-secondary);
            margin-bottom: 16px;
            line-height: 1.6;
        }
        
        .benefits-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .benefits-list li {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--text-secondary);
            font-size: 0.875rem;
            margin-bottom: 8px;
        }
        
        .benefits-list li:before {
            content: "\u2713";
            color: var(--success-color);
            font-weight: bold;
            font-size: 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
            animation: fadeIn 0.3s ease-out;
        }
        
        /* \u8F93\u5165\u65B9\u5F0F\u9009\u62E9\u4F18\u5316\u6837\u5F0F */
        .input-method-tabs {
            display: flex;
            gap: 4px;
            margin-bottom: 20px;
            background: var(--background-color);
            padding: 4px;
            border-radius: var(--radius-lg);
            border: 1px solid var(--border-color);
        }
        
        .tab-btn {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 14px 20px;
            border: none;
            background: transparent;
            color: var(--text-secondary);
            border-radius: var(--radius-md);
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
        }
        
        .tab-btn:hover {
            color: var(--primary-color);
            background: rgba(37, 99, 235, 0.05);
        }
        
        .tab-btn.active {
            background: var(--primary-color);
            color: white;
            box-shadow: var(--shadow-sm);
            transform: translateY(-1px);
        }
        
        .tab-btn .tab-icon {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            background: rgba(255, 255, 255, 0.1);
            font-size: 0.875rem;
        }
        
        .tab-btn:not(.active) .tab-icon {
            background: rgba(100, 116, 139, 0.1);
        }
        
        .file-upload-container {
            width: 100%;
        }
        
        .file-drop-zone {
            border: 2px dashed var(--border-color);
            border-radius: var(--radius-lg);
            padding: 48px 24px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background: linear-gradient(135deg, var(--background-color) 0%, rgba(248, 250, 252, 0.8) 100%);
            position: relative;
            overflow: hidden;
        }
        
        .file-drop-zone::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .file-drop-zone:hover::before,
        .file-drop-zone.dragover::before {
            opacity: 1;
        }
        
        .file-drop-zone:hover,
        .file-drop-zone.dragover {
            border-color: var(--primary-color);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(37, 99, 235, 0.15);
        }
        
        .file-drop-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            position: relative;
            z-index: 1;
        }
        
        .file-drop-icon {
            width: 64px;
            height: 64px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, var(--primary-color) 0%, #3b82f6 100%);
            border-radius: var(--radius-lg);
            color: white;
            margin-bottom: 8px;
            box-shadow: var(--shadow-md);
            position: relative;
        }
        
        .file-drop-text {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--text-primary);
            margin: 0;
            line-height: 1.4;
        }
        
        .file-drop-hint {
            font-size: 0.875rem;
            color: var(--text-secondary);
            margin: 0;
            padding: 8px 16px;
            background: rgba(100, 116, 139, 0.1);
            border-radius: var(--radius-sm);
        }
        
        .file-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px;
            background: linear-gradient(135deg, var(--surface-color) 0%, rgba(248, 250, 252, 0.5) 100%);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            margin-top: 16px;
            box-shadow: var(--shadow-sm);
            transition: all 0.2s ease;
        }
        
        .file-info:hover {
            transform: translateY(-1px);
            box-shadow: var(--shadow-md);
        }
        
        .file-details {
            display: flex;
            flex-direction: column;
            gap: 6px;
            flex: 1;
        }
        
        .file-name {
            font-weight: 600;
            color: var(--text-primary);
            font-size: 0.95rem;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .file-name::before {
            content: '';
            width: 16px;
            height: 16px;
            background: var(--primary-color);
            border-radius: 3px;
            opacity: 0.8;
            flex-shrink: 0;
        }
        
        .file-size {
            font-size: 0.8rem;
            color: var(--text-secondary);
            background: rgba(100, 116, 139, 0.1);
            padding: 2px 8px;
            border-radius: 4px;
            display: inline-block;
            width: fit-content;
        }
        
        .file-remove-btn {
            width: 32px;
            height: 32px;
            border: none;
            background: var(--error-color);
            color: white;
            border-radius: var(--radius-md);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.875rem;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-weight: 600;
        }
        
        .file-remove-btn:hover {
            background: #b91c1c;
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
        }
        
        /* \u4E3B\u529F\u80FD\u5207\u6362\u5668\u6837\u5F0F */
        .mode-switcher {
            max-width: 900px;
            margin: 0 auto 30px;
            padding: 0 20px;
            display: flex;
            justify-content: center;
            gap: 20px;
        }
        
        .mode-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            padding: 16px 32px;
            border: 2px solid var(--border-color);
            background: var(--surface-color);
            color: var(--text-secondary);
            border-radius: var(--radius-lg);
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            flex: 1;
            max-width: 250px;
        }
        
        .mode-btn:hover {
            border-color: var(--primary-color);
            color: var(--primary-color);
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }
        
        .mode-btn.active {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }
        
        .mode-icon {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        /* \u8BED\u97F3\u8F6C\u5F55\u754C\u9762\u6837\u5F0F */
        .transcription-container {
            background: var(--surface-color);
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-lg);
            border: 1px solid var(--border-color);
            overflow: hidden;
            max-width: 900px;
            margin: 0 auto;
        }
        
        .audio-upload-zone {
            border: 2px dashed var(--border-color);
            border-radius: var(--radius-lg);
            padding: 48px 24px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background: linear-gradient(135deg, var(--background-color) 0%, rgba(248, 250, 252, 0.8) 100%);
            position: relative;
            overflow: hidden;
        }
        
        .audio-upload-zone::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .audio-upload-zone:hover::before,
        .audio-upload-zone.dragover::before {
            opacity: 1;
        }
        
        .audio-upload-zone:hover,
        .audio-upload-zone.dragover {
            border-color: var(--primary-color);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(37, 99, 235, 0.15);
        }
        
        .token-config {
            display: flex;
            gap: 20px;
            margin-bottom: 16px;
        }
        
        .token-option {
            display: flex;
            align-items: center;
        }
        
        .token-label {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            font-weight: 500;
            color: var(--text-secondary);
            transition: color 0.2s ease;
        }
        
        .token-label:hover {
            color: var(--text-primary);
        }
        
        .token-label input[type="radio"] {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 2px solid var(--border-color);
            margin: 0;
            cursor: pointer;
            accent-color: var(--primary-color);
        }
        
        .transcription-result {
            margin-top: 20px;
        }
        
        .result-actions {
            display: flex;
            gap: 12px;
            margin-top: 16px;
            flex-wrap: wrap;
        }
        
        .result-actions .btn-secondary {
            flex: 1;
            min-width: 140px;
        }
        
        /* \u8BED\u8A00\u5207\u6362\u5668\u6837\u5F0F */
        .language-switcher {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        }
        
        .language-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            background: var(--surface-color);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            cursor: pointer;
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--text-secondary);
            transition: all 0.2s ease;
            box-shadow: var(--shadow-sm);
        }
        
        .language-btn:hover {
            color: var(--primary-color);
            border-color: var(--primary-color);
            box-shadow: var(--shadow-md);
        }
        
        .language-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            margin-top: 4px;
            background: var(--surface-color);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            min-width: 120px;
            display: none;
        }
        
        .language-dropdown.show {
            display: block;
        }
        
        .language-option {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            cursor: pointer;
            font-size: 0.875rem;
            color: var(--text-secondary);
            transition: background-color 0.2s ease;
        }
        
        .language-option:hover {
            background: var(--background-color);
            color: var(--text-primary);
        }
        
        .language-option.active {
            background: var(--primary-color);
            color: white;
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 16px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            .form-container {
                padding: 24px;
            }
            
            .controls-grid {
                grid-template-columns: 1fr;
                gap: 16px;
            }
            
            .promotion-content {
                grid-template-columns: 1fr;
                text-align: center;
                gap: 20px;
            }
            
            .qr-code {
                margin: 0 auto;
            }
            
            .input-method-tabs {
                gap: 2px;
                padding: 2px;
            }
            
            .tab-btn {
                padding: 12px 16px;
                font-size: 0.85rem;
                gap: 8px;
            }
            
            .tab-btn .tab-icon {
                width: 18px;
                height: 18px;
            }
            
            .file-drop-zone {
                padding: 32px 16px;
            }
            
            .file-drop-icon {
                width: 56px;
                height: 56px;
            }
            
            .file-info {
                padding: 16px;
                flex-direction: column;
                gap: 12px;
                align-items: flex-start;
            }
            
            .file-remove-btn {
                align-self: flex-end;
            }
            
            /* \u79FB\u52A8\u7AEF\u6A21\u5F0F\u5207\u6362\u5668\u6837\u5F0F */
            .mode-switcher {
                padding: 0 16px;
                margin-bottom: 20px;
                flex-direction: column;
                gap: 12px;
            }
            
            .mode-btn {
                max-width: none;
                padding: 14px 20px;
                font-size: 0.9rem;
                gap: 8px;
            }
            
            .mode-icon {
                width: 20px;
                height: 20px;
            }
            
            /* \u79FB\u52A8\u7AEF\u8BED\u97F3\u8F6C\u5F55\u754C\u9762\u6837\u5F0F */
            .audio-upload-zone {
                padding: 32px 16px;
            }
            
            .token-config {
                flex-direction: column;
                gap: 12px;
            }
            
            .result-actions {
                flex-direction: column;
            }
            
            .result-actions .btn-secondary {
                min-width: auto;
            }
        }
    </style>
</head>
<body>
    <!-- \u8BED\u8A00\u5207\u6362\u5668 -->
    <div class="language-switcher">
        <div class="language-btn" id="languageBtn">
            <span id="currentLangFlag">\u{1F310}</span>
            <span id="currentLangName" data-i18n="lang.current">English</span>
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>
        </div>
        <div class="language-dropdown" id="languageDropdown">
            <div class="language-option" data-lang="en">
                <span>\u{1F1FA}\u{1F1F8}</span>
                <span data-i18n="lang.en">English</span>
            </div>
            <div class="language-option" data-lang="zh">
                <span>\u{1F1E8}\u{1F1F3}</span>
                <span data-i18n="lang.zh">\u4E2D\u6587</span>
            </div>
            <div class="language-option" data-lang="ja">
                <span>\u{1F1EF}\u{1F1F5}</span>
                <span data-i18n="lang.ja">\u65E5\u672C\u8A9E</span>
            </div>
            <div class="language-option" data-lang="ko">
                <span>\u{1F1F0}\u{1F1F7}</span>
                <span data-i18n="lang.ko">\uD55C\uAD6D\uC5B4</span>
            </div>
            <div class="language-option" data-lang="es">
                <span>\u{1F1EA}\u{1F1F8}</span>
                <span data-i18n="lang.es">Espa\xF1ol</span>
            </div>
            <div class="language-option" data-lang="fr">
                <span>\u{1F1EB}\u{1F1F7}</span>
                <span data-i18n="lang.fr">Fran\xE7ais</span>
            </div>
            <div class="language-option" data-lang="de">
                <span>\u{1F1E9}\u{1F1EA}</span>
                <span data-i18n="lang.de">Deutsch</span>
            </div>
            <div class="language-option" data-lang="ru">
                <span>\u{1F1F7}\u{1F1FA}</span>
                <span data-i18n="lang.ru">\u0420\u0443\u0441\u0441\u043A\u0438\u0439</span>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="header">
            <h1 data-i18n="header.title">VoiceCraft</h1>
            <p class="subtitle" data-i18n="header.subtitle">AI-Powered Voice Processing Platform</p>
            <div class="features">
                <div class="feature-item">
                    <span class="feature-icon">\u2728</span>
                    <span data-i18n="header.feature1">20+ Voice Options</span>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">\u26A1</span>
                    <span data-i18n="header.feature2">Lightning Fast</span>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">\u{1F193}</span>
                    <span data-i18n="header.feature3">Completely Free</span>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">\u{1F4F1}</span>
                    <span data-i18n="header.feature4">Download Support</span>
                </div>
            </div>
        </div>
        
        <!-- \u4E3B\u529F\u80FD\u5207\u6362\u5668 -->
        <div class="mode-switcher">
            <button type="button" class="mode-btn active" id="ttsMode">
                <span class="mode-icon">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                    </svg>
                </span>
                <span data-i18n="mode.tts">Text to Speech</span>
            </button>
            <button type="button" class="mode-btn" id="transcriptionMode">
                <span class="mode-icon">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 9m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"/>
                        <path d="M9 17v4"/>
                        <path d="M12 13a3 3 0 0 0 3 -3"/>
                        <path d="M15 9.5v-3a3 3 0 0 0 -3 -3h-1"/>
                        <path d="M19 8v8"/>
                        <path d="M17 9v6"/>
                        <path d="M21 9v6"/>
                    </svg>
                </span>
                <span data-i18n="mode.transcription">Speech to Text</span>
            </button>
        </div>
        
        <div class="main-content">
            <div class="form-container">
                <form id="ttsForm">
                    <!-- \u8F93\u5165\u65B9\u5F0F\u9009\u62E9 -->
                    <div class="form-group">
                        <label class="form-label">\u9009\u62E9\u8F93\u5165\u65B9\u5F0F</label>
                        <div class="input-method-tabs">
                            <button type="button" class="tab-btn active" id="textInputTab">
                                <span class="tab-icon">
                                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                    </svg>
                                </span>
                                <span>\u624B\u52A8\u8F93\u5165</span>
                            </button>
                            <button type="button" class="tab-btn" id="fileUploadTab">
                                <span class="tab-icon">
                                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                                    </svg>
                                </span>
                                <span>\u4E0A\u4F20\u6587\u4EF6</span>
                            </button>
                        </div>
                    </div>

                    <!-- \u624B\u52A8\u8F93\u5165\u533A\u57DF -->
                    <div class="form-group" id="textInputArea">
                        <label class="form-label" for="text">\u8F93\u5165\u6587\u672C</label>
                        <textarea class="form-textarea" id="text" placeholder="\u8BF7\u8F93\u5165\u8981\u8F6C\u6362\u4E3A\u8BED\u97F3\u7684\u6587\u672C\u5185\u5BB9\uFF0C\u652F\u6301\u4E2D\u6587\u3001\u82F1\u6587\u3001\u6570\u5B57\u7B49..." required></textarea>
                    </div>

                    <!-- \u6587\u4EF6\u4E0A\u4F20\u533A\u57DF -->
                    <div class="form-group" id="fileUploadArea" style="display: none;">
                        <label class="form-label" for="fileInput">\u4E0A\u4F20txt\u6587\u4EF6</label>
                        <div class="file-upload-container">
                            <div class="file-drop-zone" id="fileDropZone">
                                <div class="file-drop-content">
                                    <div class="file-drop-icon">
                                        <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2L13.09 8.26L19 7L17.74 13.09L24 12L17.74 10.91L19 5L13.09 6.26L12 0L10.91 6.26L5 5L6.26 10.91L0 12L6.26 13.09L5 19L10.91 17.74L12 24L13.09 17.74L19 19L17.74 13.09L24 12Z"/>
                                            <path d="M14 2H6A2 2 0 0 0 4 4V20A2 2 0 0 0 6 22H18A2 2 0 0 0 20 20V8L14 2M18 20H6V4H13V9H18V20Z"/>
                                        </svg>
                                    </div>
                                    <p class="file-drop-text">\u62D6\u62FDtxt\u6587\u4EF6\u5230\u6B64\u5904\uFF0C\u6216\u70B9\u51FB\u9009\u62E9\u6587\u4EF6</p>
                                    <p class="file-drop-hint">\u652F\u6301txt\u683C\u5F0F\uFF0C\u6700\u5927500KB</p>
                                </div>
                                <input type="file" id="fileInput" accept=".txt,text/plain" style="display: none;">
                            </div>
                            <div class="file-info" id="fileInfo" style="display: none;">
                                <div class="file-details">
                                    <span class="file-name" id="fileName"></span>
                                    <span class="file-size" id="fileSize"></span>
                                </div>
                                <button type="button" class="file-remove-btn" id="fileRemoveBtn">\u2715</button>
                            </div>
                        </div>
                    </div>
                
                    <div class="controls-grid">
                        <div class="form-group">
                            <label class="form-label" for="voice">\u8BED\u97F3\u9009\u62E9</label>
                            <select class="form-select" id="voice">
                                <option value="zh-CN-XiaoxiaoNeural">\u6653\u6653 (\u5973\u58F0\xB7\u6E29\u67D4)</option>
                                <option value="zh-CN-YunxiNeural">\u4E91\u5E0C (\u7537\u58F0\xB7\u6E05\u6717)</option>
                                <option value="zh-CN-YunyangNeural">\u4E91\u626C (\u7537\u58F0\xB7\u9633\u5149)</option>
                                <option value="zh-CN-XiaoyiNeural">\u6653\u4F0A (\u5973\u58F0\xB7\u751C\u7F8E)</option>
                                <option value="zh-CN-YunjianNeural">\u4E91\u5065 (\u7537\u58F0\xB7\u7A33\u91CD)</option>
                                <option value="zh-CN-XiaochenNeural">\u6653\u8FB0 (\u5973\u58F0\xB7\u77E5\u6027)</option>
                                <option value="zh-CN-XiaohanNeural">\u6653\u6DB5 (\u5973\u58F0\xB7\u4F18\u96C5)</option>
                                <option value="zh-CN-XiaomengNeural">\u6653\u68A6 (\u5973\u58F0\xB7\u68A6\u5E7B)</option>
                                <option value="zh-CN-XiaomoNeural">\u6653\u58A8 (\u5973\u58F0\xB7\u6587\u827A)</option>
                                <option value="zh-CN-XiaoqiuNeural">\u6653\u79CB (\u5973\u58F0\xB7\u6210\u719F)</option>
                                <option value="zh-CN-XiaoruiNeural">\u6653\u777F (\u5973\u58F0\xB7\u667A\u6167)</option>
                                <option value="zh-CN-XiaoshuangNeural">\u6653\u53CC (\u5973\u58F0\xB7\u6D3B\u6CFC)</option>
                                <option value="zh-CN-XiaoxuanNeural">\u6653\u8431 (\u5973\u58F0\xB7\u6E05\u65B0)</option>
                                <option value="zh-CN-XiaoyanNeural">\u6653\u989C (\u5973\u58F0\xB7\u67D4\u7F8E)</option>
                                <option value="zh-CN-XiaoyouNeural">\u6653\u60A0 (\u5973\u58F0\xB7\u60A0\u626C)</option>
                                <option value="zh-CN-XiaozhenNeural">\u6653\u7504 (\u5973\u58F0\xB7\u7AEF\u5E84)</option>
                                <option value="zh-CN-YunfengNeural">\u4E91\u67AB (\u7537\u58F0\xB7\u78C1\u6027)</option>
                                <option value="zh-CN-YunhaoNeural">\u4E91\u7693 (\u7537\u58F0\xB7\u8C6A\u8FC8)</option>
                                <option value="zh-CN-YunxiaNeural">\u4E91\u590F (\u7537\u58F0\xB7\u70ED\u60C5)</option>
                                <option value="zh-CN-YunyeNeural">\u4E91\u91CE (\u7537\u58F0\xB7\u91CE\u6027)</option>
                                <option value="zh-CN-YunzeNeural">\u4E91\u6CFD (\u7537\u58F0\xB7\u6DF1\u6C89)</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="speed">\u8BED\u901F\u8C03\u8282</label>
                            <select class="form-select" id="speed">
                                <option value="0.5">\u{1F40C} \u5F88\u6162</option>
                                <option value="0.75">\u{1F6B6} \u6162\u901F</option>
                                <option value="1.0" selected>\u26A1 \u6B63\u5E38</option>
                                <option value="1.25">\u{1F3C3} \u5FEB\u901F</option>
                                <option value="1.5">\u{1F680} \u5F88\u5FEB</option>
                                <option value="2.0">\u{1F4A8} \u6781\u901F</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="pitch">\u97F3\u8C03\u9AD8\u4F4E</label>
                            <select class="form-select" id="pitch">
                                <option value="-50">\u{1F4C9} \u5F88\u4F4E\u6C89</option>
                                <option value="-25">\u{1F4CA} \u4F4E\u6C89</option>
                                <option value="0" selected>\u{1F3B5} \u6807\u51C6</option>
                                <option value="25">\u{1F4C8} \u9AD8\u4EA2</option>
                                <option value="50">\u{1F3B6} \u5F88\u9AD8\u4EA2</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="style">\u8BED\u97F3\u98CE\u683C</label>
                            <select class="form-select" id="style">
                                <option value="general" selected>\u{1F3AD} \u901A\u7528\u98CE\u683C</option>
                                <option value="assistant">\u{1F916} \u667A\u80FD\u52A9\u624B</option>
                                <option value="chat">\u{1F4AC} \u804A\u5929\u5BF9\u8BDD</option>
                                <option value="customerservice">\u{1F4DE} \u5BA2\u670D\u4E13\u4E1A</option>
                                <option value="newscast">\u{1F4FA} \u65B0\u95FB\u64AD\u62A5</option>
                                <option value="affectionate">\u{1F495} \u4EB2\u5207\u6E29\u6696</option>
                                <option value="calm">\u{1F60C} \u5E73\u9759\u8212\u7F13</option>
                                <option value="cheerful">\u{1F60A} \u6109\u5FEB\u6B22\u4E50</option>
                                <option value="gentle">\u{1F338} \u6E29\u548C\u67D4\u7F8E</option>
                                <option value="lyrical">\u{1F3BC} \u6292\u60C5\u8BD7\u610F</option>
                                <option value="serious">\u{1F3AF} \u4E25\u8083\u6B63\u5F0F</option>
                            </select>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn-primary" id="generateBtn">
                        <span>\u{1F399}\uFE0F</span>
                        <span>\u5F00\u59CB\u751F\u6210\u8BED\u97F3</span>
                    </button>
            </form>
            
                <div id="result" class="result-container">
                    <div id="loading" class="loading-container" style="display: none;">
                        <div class="loading-spinner"></div>
                        <p class="loading-text" id="loadingText">\u6B63\u5728\u751F\u6210\u8BED\u97F3\uFF0C\u8BF7\u7A0D\u5019...</p>
                        <div class="progress-info" id="progressInfo" style="margin-top: 12px; font-size: 0.875rem; color: var(--text-secondary);"></div>
                    </div>
                    
                    <div id="success" style="display: none;">
                        <audio id="audioPlayer" class="audio-player" controls></audio>
                        <a id="downloadBtn" class="btn-secondary" download="speech.mp3">
                            <span>\u{1F4E5}</span>
                            <span>\u4E0B\u8F7D\u97F3\u9891\u6587\u4EF6</span>
                        </a>
                    </div>
                    
                    <div id="error" class="error-message" style="display: none;"></div>
                </div>
            </div>
        </div>
        
        <!-- \u8BED\u97F3\u8F6C\u5F55\u754C\u9762 -->
        <div class="transcription-container" id="transcriptionContainer" style="display: none;">
            <div class="form-container">
                <form id="transcriptionForm">
                    <div class="form-group">
                        <label class="form-label">\u4E0A\u4F20\u97F3\u9891\u6587\u4EF6</label>
                        <div class="audio-upload-zone" id="audioDropZone">
                            <div class="file-drop-content">
                                <div class="file-drop-icon">
                                    <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                                        <path d="M14 2v6h6"/>
                                        <path d="M12 18v-6"/>
                                        <path d="M9 15l3-3 3 3"/>
                                    </svg>
                                </div>
                                <p class="file-drop-text">\u62D6\u62FD\u97F3\u9891\u6587\u4EF6\u5230\u6B64\u5904\uFF0C\u6216\u70B9\u51FB\u9009\u62E9\u6587\u4EF6</p>
                                <p class="file-drop-hint">\u652F\u6301mp3\u3001wav\u3001m4a\u3001flac\u3001aac\u3001ogg\u3001webm\u3001amr\u30013gp\u683C\u5F0F\uFF0C\u6700\u592710MB</p>
                            </div>
                            <input type="file" id="audioFileInput" accept=".mp3,.wav,.m4a,.flac,.aac,.ogg,.webm,.amr,.3gp,audio/*" style="display: none;">
                        </div>
                        <div class="file-info" id="audioFileInfo" style="display: none;">
                            <div class="file-details">
                                <span class="file-name" id="audioFileName"></span>
                                <span class="file-size" id="audioFileSize"></span>
                            </div>
                            <button type="button" class="file-remove-btn" id="audioFileRemoveBtn">\u2715</button>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="tokenInput">API Token\u914D\u7F6E</label>
                        <div class="token-config">
                            <div class="token-option">
                                <label class="token-label">
                                    <input type="radio" name="tokenOption" value="default" checked>
                                    <span>\u4F7F\u7528\u9ED8\u8BA4Token</span>
                                </label>
                            </div>
                            <div class="token-option">
                                <label class="token-label">
                                    <input type="radio" name="tokenOption" value="custom">
                                    <span>\u4F7F\u7528\u7845\u57FA\u6D41\u52A8\u81EA\u5B9A\u4E49Token</span>
                                </label>
                            </div>
                        </div>
                        <input type="password" class="form-input" id="tokenInput" 
                               placeholder="\u8F93\u5165\u60A8\u7684API Token\uFF08\u53EF\u9009\uFF09" style="display: none;">
                    </div>

                    <button type="submit" class="btn-primary" id="transcribeBtn">
                        <span>\u{1F3A7}</span>
                        <span>\u5F00\u59CB\u8BED\u97F3\u8F6C\u5F55</span>
                    </button>
                </form>

                <div id="transcriptionResult" class="result-container">
                    <div id="transcriptionLoading" class="loading-container" style="display: none;">
                        <div class="loading-spinner"></div>
                        <p class="loading-text" id="transcriptionLoadingText">\u6B63\u5728\u8F6C\u5F55\u97F3\u9891\uFF0C\u8BF7\u7A0D\u5019...</p>
                        <div class="progress-info" id="transcriptionProgressInfo" style="margin-top: 12px; font-size: 0.875rem; color: var(--text-secondary);"></div>
                    </div>
                    
                    <div id="transcriptionSuccess" style="display: none;">
                        <div class="transcription-result">
                            <label class="form-label">\u8F6C\u5F55\u7ED3\u679C</label>
                            <textarea class="form-textarea" id="transcriptionText" 
                                      placeholder="\u8F6C\u5F55\u7ED3\u679C\u5C06\u5728\u8FD9\u91CC\u663E\u793A..." readonly></textarea>
                            <div class="result-actions">
                                <button type="button" class="btn-secondary" id="copyTranscriptionBtn">
                                    <span>\u{1F4CB}</span>
                                    <span>\u590D\u5236\u6587\u672C</span>
                                </button>
                                <button type="button" class="btn-secondary" id="editTranscriptionBtn">
                                    <span>\u270F\uFE0F</span>
                                    <span>\u7F16\u8F91\u6587\u672C</span>
                                </button>
                                <button type="button" class="btn-secondary" id="useForTtsBtn">
                                    <span>\u{1F399}\uFE0F</span>
                                    <span>\u8F6C\u4E3A\u8BED\u97F3</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div id="transcriptionError" class="error-message" style="display: none;"></div>
                </div>
            </div>
        </div>
        
        <!-- \u516C\u4F17\u53F7\u63A8\u5E7F\u7EC4\u4EF6 -->
        <div class="wechat-promotion" id="wechatPromotion" style="display: none;">
            <div class="promotion-header">
                <h2 class="promotion-title">\u{1F389} \u751F\u6210\u6210\u529F\uFF01\u559C\u6B22\u8FD9\u4E2A\u5DE5\u5177\u5417\uFF1F</h2>
                <p class="promotion-subtitle">\u5173\u6CE8\u6211\u4EEC\u83B7\u53D6\u66F4\u591AAI\u5DE5\u5177\u548C\u6280\u672F\u5206\u4EAB</p>
            </div>
            <div class="promotion-content">
                <div class="qr-code">
                    <img src="https://img.996007.icu/file/img1/a48c4eac2f2a99909da5611c3885726.jpg" alt="\u5FAE\u4FE1\u516C\u4F17\u53F7\u4E8C\u7EF4\u7801" />
                </div>
                <div class="promotion-info">
                    <h3>\u5173\u6CE8\u300C\u4E00\u53EA\u4F1A\u98DE\u7684\u65FA\u65FA\u300D\u516C\u4F17\u53F7</h3>
                    <p>\u83B7\u53D6\u66F4\u591A\u5B9E\u7528\u7684AI\u5DE5\u5177\u3001\u6280\u672F\u6559\u7A0B\u548C\u72EC\u5BB6\u8D44\u6E90\u5206\u4EAB</p>
                    <ul class="benefits-list">
                        <li>\u6700\u65B0AI\u5DE5\u5177\u63A8\u8350\u548C\u4F7F\u7528\u6559\u7A0B</li>
                        <li>\u524D\u6CBF\u6280\u672F\u89E3\u6790\u548C\u5B9E\u6218\u6848\u4F8B</li>
                        <li>\u72EC\u5BB6\u8D44\u6E90\u548C\u5DE5\u5177\u6E90\u7801\u5206\u4EAB</li>
                        <li>\u6280\u672F\u95EE\u9898\u7B54\u7591\u548C\u4EA4\u6D41\u793E\u7FA4</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <script>
        let selectedFile = null;
        let currentInputMethod = 'text'; // 'text' or 'file'
        let currentMode = 'tts'; // 'tts' or 'transcription'
        let selectedAudioFile = null;
        let transcriptionToken = null;
        let currentLanguage = 'en'; // \u9ED8\u8BA4\u8BED\u8A00

        // \u56FD\u9645\u5316\u7FFB\u8BD1\u6570\u636E
        const translations = {
            en: {
                'page.title': 'VoiceCraft - AI-Powered Voice Processing Platform',
                'page.description': 'VoiceCraft is an AI-powered platform that converts text to speech and speech to text with 20+ voice options, lightning fast processing, completely free to use.',
                'page.keywords': 'text to speech,AI voice synthesis,online TTS,voice generator,free voice tools,speech to text,voice transcription',
                'lang.current': 'English',
                'lang.en': 'English',
                'lang.zh': '\u4E2D\u6587',
                'lang.ja': '\u65E5\u672C\u8A9E',
                'lang.ko': '\uD55C\uAD6D\uC5B4',
                'lang.es': 'Espa\xF1ol',
                'lang.fr': 'Fran\xE7ais',
                'lang.de': 'Deutsch',
                'lang.ru': '\u0420\u0443\u0441\u0441\u043A\u0438\u0439',
                'header.title': 'VoiceCraft',
                'header.subtitle': 'AI-Powered Voice Processing Platform',
                'header.feature1': '20+ Voice Options',
                'header.feature2': 'Lightning Fast',
                'header.feature3': 'Completely Free',
                'header.feature4': 'Download Support',
                'mode.tts': 'Text to Speech',
                'mode.transcription': 'Speech to Text'
            },
            zh: {
                'page.title': 'VoiceCraft - AI\u9A71\u52A8\u7684\u8BED\u97F3\u5904\u7406\u5E73\u53F0',
                'page.description': 'VoiceCraft\u662F\u4E00\u4E2AAI\u9A71\u52A8\u7684\u5E73\u53F0\uFF0C\u652F\u6301\u6587\u5B57\u8F6C\u8BED\u97F3\u548C\u8BED\u97F3\u8F6C\u6587\u5B57\uFF0C\u62E5\u670920+\u79CD\u8BED\u97F3\u9009\u9879\uFF0C\u95EA\u7535\u822C\u7684\u5904\u7406\u901F\u5EA6\uFF0C\u5B8C\u5168\u514D\u8D39\u4F7F\u7528\u3002',
                'page.keywords': '\u6587\u5B57\u8F6C\u8BED\u97F3,AI\u8BED\u97F3\u5408\u6210,\u5728\u7EBFTTS,\u8BED\u97F3\u751F\u6210\u5668,\u514D\u8D39\u8BED\u97F3\u5DE5\u5177,\u8BED\u97F3\u8F6C\u6587\u5B57,\u8BED\u97F3\u8F6C\u5F55',
                'lang.current': '\u4E2D\u6587',
                'lang.en': 'English',
                'lang.zh': '\u4E2D\u6587',
                'lang.ja': '\u65E5\u672C\u8A9E',
                'lang.ko': '\uD55C\uAD6D\uC5B4',
                'lang.es': 'Espa\xF1ol',
                'lang.fr': 'Fran\xE7ais',
                'lang.de': 'Deutsch',
                'lang.ru': '\u0420\u0443\u0441\u0441\u043A\u0438\u0439',
                'header.title': 'VoiceCraft',
                'header.subtitle': 'AI\u9A71\u52A8\u7684\u8BED\u97F3\u5904\u7406\u5E73\u53F0',
                'header.feature1': '20+\u79CD\u8BED\u97F3\u9009\u9879',
                'header.feature2': '\u95EA\u7535\u822C\u5FEB\u901F',
                'header.feature3': '\u5B8C\u5168\u514D\u8D39',
                'header.feature4': '\u652F\u6301\u4E0B\u8F7D',
                'mode.tts': '\u6587\u5B57\u8F6C\u8BED\u97F3',
                'mode.transcription': '\u8BED\u97F3\u8F6C\u6587\u5B57'
            },
            ja: {
                'page.title': 'VoiceCraft - AI\u97F3\u58F0\u51E6\u7406\u30D7\u30E9\u30C3\u30C8\u30D5\u30A9\u30FC\u30E0',
                'page.description': 'VoiceCraft\u306FAI\u99C6\u52D5\u306E\u30D7\u30E9\u30C3\u30C8\u30D5\u30A9\u30FC\u30E0\u3067\u3001\u30C6\u30AD\u30B9\u30C8\u8AAD\u307F\u4E0A\u3052\u3068\u97F3\u58F0\u30C6\u30AD\u30B9\u30C8\u5909\u63DB\u306B\u5BFE\u5FDC\u300220\u4EE5\u4E0A\u306E\u97F3\u58F0\u30AA\u30D7\u30B7\u30E7\u30F3\u3001\u9AD8\u901F\u51E6\u7406\u3001\u5B8C\u5168\u7121\u6599\u3067\u3054\u5229\u7528\u3044\u305F\u3060\u3051\u307E\u3059\u3002',
                'page.keywords': '\u30C6\u30AD\u30B9\u30C8\u8AAD\u307F\u4E0A\u3052,AI\u97F3\u58F0\u5408\u6210,\u30AA\u30F3\u30E9\u30A4\u30F3TTS,\u97F3\u58F0\u30B8\u30A7\u30CD\u30EC\u30FC\u30BF\u30FC,\u7121\u6599\u97F3\u58F0\u30C4\u30FC\u30EB,\u97F3\u58F0\u30C6\u30AD\u30B9\u30C8\u5909\u63DB,\u97F3\u58F0\u8EE2\u5199',
                'lang.current': '\u65E5\u672C\u8A9E',
                'lang.en': 'English',
                'lang.zh': '\u4E2D\u6587',
                'lang.ja': '\u65E5\u672C\u8A9E',
                'lang.ko': '\uD55C\uAD6D\uC5B4',
                'lang.es': 'Espa\xF1ol',
                'lang.fr': 'Fran\xE7ais',
                'lang.de': 'Deutsch',
                'lang.ru': '\u0420\u0443\u0441\u0441\u043A\u0438\u0439',
                'header.title': 'VoiceCraft',
                'header.subtitle': 'AI\u97F3\u58F0\u51E6\u7406\u30D7\u30E9\u30C3\u30C8\u30D5\u30A9\u30FC\u30E0',
                'header.feature1': '20\u4EE5\u4E0A\u306E\u97F3\u58F0\u30AA\u30D7\u30B7\u30E7\u30F3',
                'header.feature2': '\u9AD8\u901F\u51E6\u7406',
                'header.feature3': '\u5B8C\u5168\u7121\u6599',
                'header.feature4': '\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u5BFE\u5FDC',
                'mode.tts': '\u30C6\u30AD\u30B9\u30C8\u8AAD\u307F\u4E0A\u3052',
                'mode.transcription': '\u97F3\u58F0\u30C6\u30AD\u30B9\u30C8\u5909\u63DB'
            },
            ko: {
                'page.title': 'VoiceCraft - AI \uC74C\uC131 \uCC98\uB9AC \uD50C\uB7AB\uD3FC',
                'page.description': 'VoiceCraft\uB294 AI \uAE30\uBC18 \uD50C\uB7AB\uD3FC\uC73C\uB85C \uD14D\uC2A4\uD2B8 \uC74C\uC131 \uBCC0\uD658\uACFC \uC74C\uC131 \uD14D\uC2A4\uD2B8 \uBCC0\uD658\uC744 \uC9C0\uC6D0\uD569\uB2C8\uB2E4. 20\uAC1C \uC774\uC0C1\uC758 \uC74C\uC131 \uC635\uC158, \uBE60\uB978 \uCC98\uB9AC \uC18D\uB3C4, \uC644\uC804 \uBB34\uB8CC\uB85C \uC774\uC6A9\uD558\uC2E4 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
                'page.keywords': '\uD14D\uC2A4\uD2B8 \uC74C\uC131 \uBCC0\uD658,AI \uC74C\uC131 \uD569\uC131,\uC628\uB77C\uC778 TTS,\uC74C\uC131 \uC0DD\uC131\uAE30,\uBB34\uB8CC \uC74C\uC131 \uB3C4\uAD6C,\uC74C\uC131 \uD14D\uC2A4\uD2B8 \uBCC0\uD658,\uC74C\uC131 \uC804\uC0AC',
                'lang.current': '\uD55C\uAD6D\uC5B4',
                'lang.en': 'English',
                'lang.zh': '\u4E2D\u6587',
                'lang.ja': '\u65E5\u672C\u8A9E',
                'lang.ko': '\uD55C\uAD6D\uC5B4',
                'lang.es': 'Espa\xF1ol',
                'lang.fr': 'Fran\xE7ais',
                'lang.de': 'Deutsch',
                'lang.ru': '\u0420\u0443\u0441\u0441\u043A\u0438\u0439',
                'header.title': 'VoiceCraft',
                'header.subtitle': 'AI \uC74C\uC131 \uCC98\uB9AC \uD50C\uB7AB\uD3FC',
                'header.feature1': '20\uAC1C \uC774\uC0C1\uC758 \uC74C\uC131 \uC635\uC158',
                'header.feature2': '\uBE60\uB978 \uCC98\uB9AC',
                'header.feature3': '\uC644\uC804 \uBB34\uB8CC',
                'header.feature4': '\uB2E4\uC6B4\uB85C\uB4DC \uC9C0\uC6D0',
                'mode.tts': '\uD14D\uC2A4\uD2B8 \uC74C\uC131 \uBCC0\uD658',
                'mode.transcription': '\uC74C\uC131 \uD14D\uC2A4\uD2B8 \uBCC0\uD658'
            },
            es: {
                'page.title': 'VoiceCraft - Plataforma de Procesamiento de Voz con IA',
                'page.description': 'VoiceCraft es una plataforma impulsada por IA que convierte texto a voz y voz a texto con m\xE1s de 20 opciones de voz, procesamiento ultrarr\xE1pido, completamente gratis.',
                'page.keywords': 'texto a voz,s\xEDntesis de voz IA,TTS en l\xEDnea,generador de voz,herramientas de voz gratis,voz a texto,transcripci\xF3n de voz',
                'lang.current': 'Espa\xF1ol',
                'lang.en': 'English',
                'lang.zh': '\u4E2D\u6587',
                'lang.ja': '\u65E5\u672C\u8A9E',
                'lang.ko': '\uD55C\uAD6D\uC5B4',
                'lang.es': 'Espa\xF1ol',
                'lang.fr': 'Fran\xE7ais',
                'lang.de': 'Deutsch',
                'lang.ru': '\u0420\u0443\u0441\u0441\u043A\u0438\u0439',
                'header.title': 'VoiceCraft',
                'header.subtitle': 'Plataforma de Procesamiento de Voz con IA',
                'header.feature1': 'M\xE1s de 20 Opciones de Voz',
                'header.feature2': 'Ultrarr\xE1pido',
                'header.feature3': 'Completamente Gratis',
                'header.feature4': 'Soporte de Descarga',
                'mode.tts': 'Texto a Voz',
                'mode.transcription': 'Voz a Texto'
            },
            fr: {
                'page.title': 'VoiceCraft - Plateforme de Traitement Vocal IA',
                'page.description': 'VoiceCraft est une plateforme aliment\xE9e par IA qui convertit le texte en parole et la parole en texte avec plus de 20 options vocales, traitement ultra-rapide, enti\xE8rement gratuit.',
                'page.keywords': 'texte vers parole,synth\xE8se vocale IA,TTS en ligne,g\xE9n\xE9rateur vocal,outils vocaux gratuits,parole vers texte,transcription vocale',
                'lang.current': 'Fran\xE7ais',
                'lang.en': 'English',
                'lang.zh': '\u4E2D\u6587',
                'lang.ja': '\u65E5\u672C\u8A9E',
                'lang.ko': '\uD55C\uAD6D\uC5B4',
                'lang.es': 'Espa\xF1ol',
                'lang.fr': 'Fran\xE7ais',
                'lang.de': 'Deutsch',
                'lang.ru': '\u0420\u0443\u0441\u0441\u043A\u0438\u0439',
                'header.title': 'VoiceCraft',
                'header.subtitle': 'Plateforme de Traitement Vocal IA',
                'header.feature1': 'Plus de 20 Options Vocales',
                'header.feature2': 'Ultra-rapide',
                'header.feature3': 'Enti\xE8rement Gratuit',
                'header.feature4': 'Support de T\xE9l\xE9chargement',
                'mode.tts': 'Texte vers Parole',
                'mode.transcription': 'Parole vers Texte'
            },
            de: {
                'page.title': 'VoiceCraft - KI-gest\xFCtzte Sprachverarbeitungsplattform',
                'page.description': 'VoiceCraft ist eine KI-gest\xFCtzte Plattform, die Text in Sprache und Sprache in Text umwandelt, mit \xFCber 20 Sprachoptionen, blitzschneller Verarbeitung, v\xF6llig kostenlos.',
                'page.keywords': 'Text zu Sprache,KI-Sprachsynthese,Online-TTS,Sprachgenerator,kostenlose Sprachtools,Sprache zu Text,Sprachtranskription',
                'lang.current': 'Deutsch',
                'lang.en': 'English',
                'lang.zh': '\u4E2D\u6587',
                'lang.ja': '\u65E5\u672C\u8A9E',
                'lang.ko': '\uD55C\uAD6D\uC5B4',
                'lang.es': 'Espa\xF1ol',
                'lang.fr': 'Fran\xE7ais',
                'lang.de': 'Deutsch',
                'lang.ru': '\u0420\u0443\u0441\u0441\u043A\u0438\u0439',
                'header.title': 'VoiceCraft',
                'header.subtitle': 'KI-gest\xFCtzte Sprachverarbeitungsplattform',
                'header.feature1': '\xDCber 20 Sprachoptionen',
                'header.feature2': 'Blitzschnell',
                'header.feature3': 'V\xF6llig Kostenlos',
                'header.feature4': 'Download-Unterst\xFCtzung',
                'mode.tts': 'Text zu Sprache',
                'mode.transcription': 'Sprache zu Text'
            },
            ru: {
                'page.title': 'VoiceCraft - \u0418\u0418-\u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0433\u043E\u043B\u043E\u0441\u0430',
                'page.description': 'VoiceCraft - \u044D\u0442\u043E \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430 \u043D\u0430 \u0431\u0430\u0437\u0435 \u0418\u0418, \u043A\u043E\u0442\u043E\u0440\u0430\u044F \u043F\u0440\u0435\u043E\u0431\u0440\u0430\u0437\u0443\u0435\u0442 \u0442\u0435\u043A\u0441\u0442 \u0432 \u0440\u0435\u0447\u044C \u0438 \u0440\u0435\u0447\u044C \u0432 \u0442\u0435\u043A\u0441\u0442 \u0441 \u0431\u043E\u043B\u0435\u0435 \u0447\u0435\u043C 20 \u0433\u043E\u043B\u043E\u0441\u043E\u0432\u044B\u043C\u0438 \u043E\u043F\u0446\u0438\u044F\u043C\u0438, \u043C\u043E\u043B\u043D\u0438\u0435\u043D\u043E\u0441\u043D\u043E\u0439 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u043E\u0439, \u0441\u043E\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u043E \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E.',
                'page.keywords': '\u0442\u0435\u043A\u0441\u0442 \u0432 \u0440\u0435\u0447\u044C,\u0418\u0418 \u0441\u0438\u043D\u0442\u0435\u0437 \u0440\u0435\u0447\u0438,\u043E\u043D\u043B\u0430\u0439\u043D TTS,\u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440 \u0433\u043E\u043B\u043E\u0441\u0430,\u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u044B\u0435 \u0433\u043E\u043B\u043E\u0441\u043E\u0432\u044B\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B,\u0440\u0435\u0447\u044C \u0432 \u0442\u0435\u043A\u0441\u0442,\u0442\u0440\u0430\u043D\u0441\u043A\u0440\u0438\u043F\u0446\u0438\u044F \u0440\u0435\u0447\u0438',
                'lang.current': '\u0420\u0443\u0441\u0441\u043A\u0438\u0439',
                'lang.en': 'English',
                'lang.zh': '\u4E2D\u6587',
                'lang.ja': '\u65E5\u672C\u8A9E',
                'lang.ko': '\uD55C\uAD6D\uC5B4',
                'lang.es': 'Espa\xF1ol',
                'lang.fr': 'Fran\xE7ais',
                'lang.de': 'Deutsch',
                'lang.ru': '\u0420\u0443\u0441\u0441\u043A\u0438\u0439',
                'header.title': 'VoiceCraft',
                'header.subtitle': '\u0418\u0418-\u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0433\u043E\u043B\u043E\u0441\u0430',
                'header.feature1': '\u0411\u043E\u043B\u0435\u0435 20 \u0433\u043E\u043B\u043E\u0441\u043E\u0432\u044B\u0445 \u043E\u043F\u0446\u0438\u0439',
                'header.feature2': '\u041C\u043E\u043B\u043D\u0438\u0435\u043D\u043E\u0441\u043D\u043E',
                'header.feature3': '\u0421\u043E\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u043E \u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E',
                'header.feature4': '\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430 \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0438',
                'mode.tts': '\u0422\u0435\u043A\u0441\u0442 \u0432 \u0420\u0435\u0447\u044C',
                'mode.transcription': '\u0420\u0435\u0447\u044C \u0432 \u0422\u0435\u043A\u0441\u0442'
            }
        };

        // \u56FD\u9645\u5316\u529F\u80FD
        function detectLanguage() {
            // \u68C0\u6D4B\u6D4F\u89C8\u5668\u8BED\u8A00
            const browserLang = navigator.language || navigator.userLanguage;
            const shortLang = browserLang.split('-')[0];
            
            // \u68C0\u67E5\u662F\u5426\u652F\u6301\u8BE5\u8BED\u8A00
            if (translations[shortLang]) {
                return shortLang;
            }
            
            // \u9ED8\u8BA4\u8FD4\u56DE\u82F1\u8BED
            return 'en';
        }

        function setLanguage(lang) {
            currentLanguage = lang;
            localStorage.setItem('voicecraft-language', lang);
            
            // \u66F4\u65B0\u9875\u9762\u8BED\u8A00\u5C5E\u6027
            document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
            
            // \u5E94\u7528\u7FFB\u8BD1
            applyTranslations();
            
            // \u66F4\u65B0\u8BED\u8A00\u5207\u6362\u5668
            updateLanguageSwitcher();
        }

        function applyTranslations() {
            const langData = translations[currentLanguage];
            
            // \u66F4\u65B0\u6240\u6709\u5E26\u6709 data-i18n \u5C5E\u6027\u7684\u5143\u7D20
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (langData[key]) {
                    element.textContent = langData[key];
                }
            });
            
            // \u66F4\u65B0 meta \u6807\u7B7E
            document.querySelectorAll('[data-i18n-content]').forEach(element => {
                const key = element.getAttribute('data-i18n-content');
                if (langData[key]) {
                    element.setAttribute('content', langData[key]);
                }
            });
            
            // \u66F4\u65B0\u9875\u9762\u6807\u9898
            if (langData['page.title']) {
                document.title = langData['page.title'];
            }
        }

        function updateLanguageSwitcher() {
            const langFlags = {
                'en': '\u{1F1FA}\u{1F1F8}',
                'zh': '\u{1F1E8}\u{1F1F3}',
                'ja': '\u{1F1EF}\u{1F1F5}',
                'ko': '\u{1F1F0}\u{1F1F7}',
                'es': '\u{1F1EA}\u{1F1F8}',
                'fr': '\u{1F1EB}\u{1F1F7}',
                'de': '\u{1F1E9}\u{1F1EA}',
                'ru': '\u{1F1F7}\u{1F1FA}'
            };
            
            const langData = translations[currentLanguage];
            document.getElementById('currentLangFlag').textContent = langFlags[currentLanguage];
            document.getElementById('currentLangName').textContent = langData['lang.current'];
            
            // \u66F4\u65B0\u9009\u4E2D\u72B6\u6001
            document.querySelectorAll('.language-option').forEach(option => {
                option.classList.remove('active');
                if (option.getAttribute('data-lang') === currentLanguage) {
                    option.classList.add('active');
                }
            });
        }

        // \u521D\u59CB\u5316\u9875\u9762
        document.addEventListener('DOMContentLoaded', function() {
            // \u521D\u59CB\u5316\u56FD\u9645\u5316
            initializeI18n();
            
            // \u521D\u59CB\u5316\u5176\u4ED6\u529F\u80FD
            initializeInputMethodTabs();
            initializeFileUpload();
            initializeModeSwitcher();
            initializeAudioUpload();
            initializeTokenConfig();
            initializeLanguageSwitcher();
        });

        // \u521D\u59CB\u5316\u8F93\u5165\u65B9\u5F0F\u5207\u6362
        function initializeInputMethodTabs() {
            const textInputTab = document.getElementById('textInputTab');
            const fileUploadTab = document.getElementById('fileUploadTab');
            const textInputArea = document.getElementById('textInputArea');
            const fileUploadArea = document.getElementById('fileUploadArea');

            textInputTab.addEventListener('click', function() {
                currentInputMethod = 'text';
                textInputTab.classList.add('active');
                fileUploadTab.classList.remove('active');
                textInputArea.style.display = 'block';
                fileUploadArea.style.display = 'none';
                document.getElementById('text').required = true;
            });

            fileUploadTab.addEventListener('click', function() {
                currentInputMethod = 'file';
                fileUploadTab.classList.add('active');
                textInputTab.classList.remove('active');
                textInputArea.style.display = 'none';
                fileUploadArea.style.display = 'block';
                document.getElementById('text').required = false;
            });
        }

        // \u521D\u59CB\u5316\u6587\u4EF6\u4E0A\u4F20\u529F\u80FD
        function initializeFileUpload() {
            const fileDropZone = document.getElementById('fileDropZone');
            const fileInput = document.getElementById('fileInput');
            const fileInfo = document.getElementById('fileInfo');
            const fileRemoveBtn = document.getElementById('fileRemoveBtn');

            // \u70B9\u51FB\u4E0A\u4F20\u533A\u57DF
            fileDropZone.addEventListener('click', function() {
                fileInput.click();
            });

            // \u6587\u4EF6\u9009\u62E9
            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    handleFileSelect(file);
                }
            });

            // \u62D6\u62FD\u529F\u80FD
            fileDropZone.addEventListener('dragover', function(e) {
                e.preventDefault();
                fileDropZone.classList.add('dragover');
            });

            fileDropZone.addEventListener('dragleave', function(e) {
                e.preventDefault();
                fileDropZone.classList.remove('dragover');
            });

            fileDropZone.addEventListener('drop', function(e) {
                e.preventDefault();
                fileDropZone.classList.remove('dragover');
                const file = e.dataTransfer.files[0];
                if (file) {
                    handleFileSelect(file);
                }
            });

            // \u79FB\u9664\u6587\u4EF6
            fileRemoveBtn.addEventListener('click', function() {
                selectedFile = null;
                fileInput.value = '';
                fileInfo.style.display = 'none';
                fileDropZone.style.display = 'block';
            });
        }

        // \u5904\u7406\u6587\u4EF6\u9009\u62E9
        function handleFileSelect(file) {
            // \u9A8C\u8BC1\u6587\u4EF6\u7C7B\u578B
            if (!file.type.includes('text/') && !file.name.toLowerCase().endsWith('.txt')) {
                alert('\u8BF7\u9009\u62E9txt\u683C\u5F0F\u7684\u6587\u672C\u6587\u4EF6');
                return;
            }

            // \u9A8C\u8BC1\u6587\u4EF6\u5927\u5C0F
            if (file.size > 500 * 1024) {
                alert('\u6587\u4EF6\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7500KB');
                return;
            }

            selectedFile = file;
            
            // \u663E\u793A\u6587\u4EF6\u4FE1\u606F
            document.getElementById('fileName').textContent = file.name;
            document.getElementById('fileSize').textContent = formatFileSize(file.size);
            document.getElementById('fileInfo').style.display = 'flex';
            document.getElementById('fileDropZone').style.display = 'none';
        }

        // \u683C\u5F0F\u5316\u6587\u4EF6\u5927\u5C0F
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        // \u8868\u5355\u63D0\u4EA4\u5904\u7406
        document.getElementById('ttsForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const voice = document.getElementById('voice').value;
            const speed = document.getElementById('speed').value;
            const pitch = document.getElementById('pitch').value;
            const style = document.getElementById('style').value;
            
            const generateBtn = document.getElementById('generateBtn');
            const resultContainer = document.getElementById('result');
            const loading = document.getElementById('loading');
            const success = document.getElementById('success');
            const error = document.getElementById('error');
            
            // \u9A8C\u8BC1\u8F93\u5165
            if (currentInputMethod === 'text') {
                const text = document.getElementById('text').value;
                if (!text.trim()) {
                    alert('\u8BF7\u8F93\u5165\u8981\u8F6C\u6362\u7684\u6587\u672C\u5185\u5BB9');
                    return;
                }
            } else if (currentInputMethod === 'file') {
                if (!selectedFile) {
                    alert('\u8BF7\u9009\u62E9\u8981\u4E0A\u4F20\u7684txt\u6587\u4EF6');
                    return;
                }
            }
            
            // \u91CD\u7F6E\u72B6\u6001
            resultContainer.style.display = 'block';
            loading.style.display = 'block';
            success.style.display = 'none';
            error.style.display = 'none';
            generateBtn.disabled = true;
            generateBtn.textContent = '\u751F\u6210\u4E2D...';
            
            try {
                let response;
                let textLength = 0;
                
                // \u66F4\u65B0\u52A0\u8F7D\u63D0\u793A
                const loadingText = document.getElementById('loadingText');
                const progressInfo = document.getElementById('progressInfo');
                
                if (currentInputMethod === 'text') {
                    // \u624B\u52A8\u8F93\u5165\u6587\u672C
                    const text = document.getElementById('text').value;
                    textLength = text.length;
                    
                    // \u6839\u636E\u6587\u672C\u957F\u5EA6\u663E\u793A\u4E0D\u540C\u7684\u63D0\u793A
                    if (textLength > 3000) {
                        loadingText.textContent = '\u6B63\u5728\u5904\u7406\u957F\u6587\u672C\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85...';
                        progressInfo.textContent = '\u6587\u672C\u957F\u5EA6: ' + textLength + ' \u5B57\u7B26\uFF0C\u9884\u8BA1\u9700\u8981 ' + (Math.ceil(textLength / 1500) * 2) + ' \u79D2';
                    } else {
                        loadingText.textContent = '\u6B63\u5728\u751F\u6210\u8BED\u97F3\uFF0C\u8BF7\u7A0D\u5019...';
                        progressInfo.textContent = '\u6587\u672C\u957F\u5EA6: ' + textLength + ' \u5B57\u7B26';
                    }
                    
                    response = await fetch('/v1/audio/speech', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            input: text,
                            voice: voice,
                            speed: parseFloat(speed),
                            pitch: pitch,
                            style: style
                        })
                    });
                } else {
                    // \u6587\u4EF6\u4E0A\u4F20
                    loadingText.textContent = '\u6B63\u5728\u5904\u7406\u4E0A\u4F20\u7684\u6587\u4EF6...';
                    progressInfo.textContent = '\u6587\u4EF6: ' + selectedFile.name + ' (' + formatFileSize(selectedFile.size) + ')';
                    
                    const formData = new FormData();
                    formData.append('file', selectedFile);
                    formData.append('voice', voice);
                    formData.append('speed', speed);
                    formData.append('pitch', pitch);
                    formData.append('style', style);
                    
                    response = await fetch('/v1/audio/speech', {
                        method: 'POST',
                        body: formData
                    });
                }
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error?.message || '\u751F\u6210\u5931\u8D25');
                }
                
                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);
                
                // \u663E\u793A\u97F3\u9891\u64AD\u653E\u5668
                const audioPlayer = document.getElementById('audioPlayer');
                const downloadBtn = document.getElementById('downloadBtn');
                
                audioPlayer.src = audioUrl;
                downloadBtn.href = audioUrl;
                
                loading.style.display = 'none';
                success.style.display = 'block';
                
                // \u663E\u793A\u516C\u4F17\u53F7\u63A8\u5E7F\u7EC4\u4EF6
                setTimeout(() => {
                    const wechatPromotion = document.getElementById('wechatPromotion');
                    wechatPromotion.style.display = 'block';
                    wechatPromotion.classList.add('fade-in');
                }, 1000);
                
            } catch (err) {
                loading.style.display = 'none';
                error.style.display = 'block';
                
                // \u6839\u636E\u9519\u8BEF\u7C7B\u578B\u663E\u793A\u4E0D\u540C\u7684\u63D0\u793A
                if (err.message.includes('Too many subrequests')) {
                    error.textContent = '\u9519\u8BEF: \u6587\u672C\u8FC7\u957F\u5BFC\u81F4\u8BF7\u6C42\u8FC7\u591A\uFF0C\u8BF7\u7F29\u77ED\u6587\u672C\u5185\u5BB9\u6216\u5206\u6BB5\u5904\u7406';
                } else if (err.message.includes('\u9891\u7387\u9650\u5236') || err.message.includes('429')) {
                    error.textContent = '\u9519\u8BEF: \u8BF7\u6C42\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5';
                } else if (err.message.includes('\u5206\u5757\u6570\u91CF') && err.message.includes('\u8D85\u8FC7\u9650\u5236')) {
                    error.textContent = '\u9519\u8BEF: ' + err.message;
                } else {
                    error.textContent = '\u9519\u8BEF: ' + err.message;
                }
            } finally {
                generateBtn.disabled = false;
                generateBtn.innerHTML = '<span>\u{1F399}\uFE0F</span><span>\u5F00\u59CB\u751F\u6210\u8BED\u97F3</span>';
            }
        });

        // \u521D\u59CB\u5316\u6A21\u5F0F\u5207\u6362\u5668
        function initializeModeSwitcher() {
            const ttsMode = document.getElementById('ttsMode');
            const transcriptionMode = document.getElementById('transcriptionMode');
            const mainContent = document.querySelector('.main-content');
            const transcriptionContainer = document.getElementById('transcriptionContainer');

            ttsMode.addEventListener('click', function() {
                switchMode('tts');
            });

            transcriptionMode.addEventListener('click', function() {
                switchMode('transcription');
            });
        }

        // \u5207\u6362\u529F\u80FD\u6A21\u5F0F
        function switchMode(mode) {
            const ttsMode = document.getElementById('ttsMode');
            const transcriptionMode = document.getElementById('transcriptionMode');
            const mainContent = document.querySelector('.main-content');
            const transcriptionContainer = document.getElementById('transcriptionContainer');
            const wechatPromotion = document.getElementById('wechatPromotion');

            currentMode = mode;

            if (mode === 'tts') {
                // \u5207\u6362\u5230TTS\u6A21\u5F0F
                ttsMode.classList.add('active');
                transcriptionMode.classList.remove('active');
                mainContent.style.display = 'block';
                transcriptionContainer.style.display = 'none';
            } else {
                // \u5207\u6362\u5230\u8BED\u97F3\u8F6C\u5F55\u6A21\u5F0F
                transcriptionMode.classList.add('active');
                ttsMode.classList.remove('active');
                mainContent.style.display = 'none';
                transcriptionContainer.style.display = 'block';
            }

            // \u9690\u85CF\u63A8\u5E7F\u7EC4\u4EF6
            wechatPromotion.style.display = 'none';
        }

        // \u521D\u59CB\u5316\u97F3\u9891\u4E0A\u4F20\u529F\u80FD
        function initializeAudioUpload() {
            const audioDropZone = document.getElementById('audioDropZone');
            const audioFileInput = document.getElementById('audioFileInput');
            const audioFileInfo = document.getElementById('audioFileInfo');
            const audioFileRemoveBtn = document.getElementById('audioFileRemoveBtn');

            // \u70B9\u51FB\u4E0A\u4F20\u533A\u57DF
            audioDropZone.addEventListener('click', function() {
                audioFileInput.click();
            });

            // \u6587\u4EF6\u9009\u62E9
            audioFileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    handleAudioFileSelect(file);
                }
            });

            // \u62D6\u62FD\u529F\u80FD
            audioDropZone.addEventListener('dragover', function(e) {
                e.preventDefault();
                audioDropZone.classList.add('dragover');
            });

            audioDropZone.addEventListener('dragleave', function(e) {
                e.preventDefault();
                audioDropZone.classList.remove('dragover');
            });

            audioDropZone.addEventListener('drop', function(e) {
                e.preventDefault();
                audioDropZone.classList.remove('dragover');
                const file = e.dataTransfer.files[0];
                if (file) {
                    handleAudioFileSelect(file);
                }
            });

            // \u79FB\u9664\u6587\u4EF6
            audioFileRemoveBtn.addEventListener('click', function() {
                selectedAudioFile = null;
                audioFileInput.value = '';
                audioFileInfo.style.display = 'none';
                audioDropZone.style.display = 'block';
            });
        }

        // \u5904\u7406\u97F3\u9891\u6587\u4EF6\u9009\u62E9
        function handleAudioFileSelect(file) {
            // \u9A8C\u8BC1\u6587\u4EF6\u7C7B\u578B
            const allowedTypes = [
                'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/m4a', 'audio/flac', 'audio/aac',
                'audio/ogg', 'audio/webm', 'audio/amr', 'audio/3gpp'
            ];
            
            const isValidType = allowedTypes.some(type => 
                file.type.includes(type) || 
                file.name.toLowerCase().match(/.(mp3|wav|m4a|flac|aac|ogg|webm|amr|3gp)$/i)
            );

            if (!isValidType) {
                alert('\u8BF7\u9009\u62E9\u97F3\u9891\u683C\u5F0F\u7684\u6587\u4EF6\uFF08mp3\u3001wav\u3001m4a\u3001flac\u3001aac\u3001ogg\u3001webm\u3001amr\u30013gp\uFF09');
                return;
            }

            // \u9A8C\u8BC1\u6587\u4EF6\u5927\u5C0F\uFF08\u9650\u5236\u4E3A10MB\uFF09
            if (file.size > 10 * 1024 * 1024) {
                alert('\u97F3\u9891\u6587\u4EF6\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC710MB');
                return;
            }

            selectedAudioFile = file;
            
            // \u663E\u793A\u6587\u4EF6\u4FE1\u606F
            document.getElementById('audioFileName').textContent = file.name;
            document.getElementById('audioFileSize').textContent = formatFileSize(file.size);
            document.getElementById('audioFileInfo').style.display = 'flex';
            document.getElementById('audioDropZone').style.display = 'none';
        }

        // \u521D\u59CB\u5316Token\u914D\u7F6E
        function initializeTokenConfig() {
            const tokenRadios = document.querySelectorAll('input[name="tokenOption"]');
            const tokenInput = document.getElementById('tokenInput');

            tokenRadios.forEach(radio => {
                radio.addEventListener('change', function() {
                    if (this.value === 'custom') {
                        tokenInput.style.display = 'block';
                        tokenInput.required = true;
                    } else {
                        tokenInput.style.display = 'none';
                        tokenInput.required = false;
                        tokenInput.value = '';
                    }
                });
            });
        }

        // \u5904\u7406\u8BED\u97F3\u8F6C\u5F55\u8868\u5355\u63D0\u4EA4
        document.getElementById('transcriptionForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const transcribeBtn = document.getElementById('transcribeBtn');
            const transcriptionResult = document.getElementById('transcriptionResult');
            const transcriptionLoading = document.getElementById('transcriptionLoading');
            const transcriptionSuccess = document.getElementById('transcriptionSuccess');
            const transcriptionError = document.getElementById('transcriptionError');
            
            // \u9A8C\u8BC1\u97F3\u9891\u6587\u4EF6
            if (!selectedAudioFile) {
                alert('\u8BF7\u9009\u62E9\u8981\u8F6C\u5F55\u7684\u97F3\u9891\u6587\u4EF6');
                return;
            }
            
            // \u83B7\u53D6Token\u914D\u7F6E
            const tokenOption = document.querySelector('input[name="tokenOption"]:checked').value;
            const customToken = document.getElementById('tokenInput').value;
            
            if (tokenOption === 'custom' && !customToken.trim()) {
                alert('\u8BF7\u8F93\u5165\u81EA\u5B9A\u4E49Token');
                return;
            }
            
            // \u91CD\u7F6E\u72B6\u6001
            transcriptionResult.style.display = 'block';
            transcriptionLoading.style.display = 'block';
            transcriptionSuccess.style.display = 'none';
            transcriptionError.style.display = 'none';
            transcribeBtn.disabled = true;
            transcribeBtn.textContent = '\u8F6C\u5F55\u4E2D...';
            
            // \u66F4\u65B0\u52A0\u8F7D\u63D0\u793A
            const loadingText = document.getElementById('transcriptionLoadingText');
            const progressInfo = document.getElementById('transcriptionProgressInfo');
            loadingText.textContent = '\u6B63\u5728\u8F6C\u5F55\u97F3\u9891\uFF0C\u8BF7\u7A0D\u5019...';
            progressInfo.textContent = '\u6587\u4EF6: ' + selectedAudioFile.name + ' (' + formatFileSize(selectedAudioFile.size) + ')';
            
            try {
                // \u6784\u5EFAFormData
                const formData = new FormData();
                formData.append('file', selectedAudioFile);
                
                if (tokenOption === 'custom') {
                    formData.append('token', customToken);
                }
                
                const response = await fetch('/v1/audio/transcriptions', {
                    method: 'POST',
                    body: formData
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error?.message || '\u8F6C\u5F55\u5931\u8D25');
                }
                
                const result = await response.json();
                
                // \u663E\u793A\u8F6C\u5F55\u7ED3\u679C
                document.getElementById('transcriptionText').value = result.text || '';
                transcriptionLoading.style.display = 'none';
                transcriptionSuccess.style.display = 'block';
                
                // \u663E\u793A\u516C\u4F17\u53F7\u63A8\u5E7F\u7EC4\u4EF6
                setTimeout(() => {
                    const wechatPromotion = document.getElementById('wechatPromotion');
                    wechatPromotion.style.display = 'block';
                    wechatPromotion.classList.add('fade-in');
                }, 1000);
                
            } catch (err) {
                transcriptionLoading.style.display = 'none';
                transcriptionError.style.display = 'block';
                transcriptionError.textContent = '\u9519\u8BEF: ' + err.message;
            } finally {
                transcribeBtn.disabled = false;
                transcribeBtn.innerHTML = '<span>\u{1F3A7}</span><span>\u5F00\u59CB\u8BED\u97F3\u8F6C\u5F55</span>';
            }
        });

        // \u590D\u5236\u8F6C\u5F55\u7ED3\u679C
        document.getElementById('copyTranscriptionBtn').addEventListener('click', function() {
            const transcriptionText = document.getElementById('transcriptionText');
            transcriptionText.select();
            document.execCommand('copy');
            
            // \u4E34\u65F6\u6539\u53D8\u6309\u94AE\u6587\u672C
            const originalText = this.innerHTML;
            this.innerHTML = '<span>\u2705</span><span>\u5DF2\u590D\u5236</span>';
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });

        // \u7F16\u8F91\u8F6C\u5F55\u7ED3\u679C
        document.getElementById('editTranscriptionBtn').addEventListener('click', function() {
            const transcriptionText = document.getElementById('transcriptionText');
            const isReadonly = transcriptionText.readOnly;
            
            if (isReadonly) {
                transcriptionText.readOnly = false;
                transcriptionText.focus();
                this.innerHTML = '<span>\u{1F4BE}</span><span>\u4FDD\u5B58\u7F16\u8F91</span>';
            } else {
                transcriptionText.readOnly = true;
                this.innerHTML = '<span>\u270F\uFE0F</span><span>\u7F16\u8F91\u6587\u672C</span>';
            }
        });

        // \u8F6C\u4E3A\u8BED\u97F3\u529F\u80FD
        document.getElementById('useForTtsBtn').addEventListener('click', function() {
            const transcriptionText = document.getElementById('transcriptionText').value;
            
            if (!transcriptionText.trim()) {
                alert('\u8F6C\u5F55\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u8F6C\u6362\u4E3A\u8BED\u97F3');
                return;
            }
            
            // \u5207\u6362\u5230TTS\u6A21\u5F0F
            switchMode('tts');
            
            // \u5C06\u8F6C\u5F55\u6587\u672C\u586B\u5165TTS\u6587\u672C\u6846
            document.getElementById('text').value = transcriptionText;
            
            // \u6EDA\u52A8\u5230TTS\u533A\u57DF
            document.querySelector('.main-content').scrollIntoView({ behavior: 'smooth' });
        });

        // \u521D\u59CB\u5316\u56FD\u9645\u5316
        function initializeI18n() {
            // \u68C0\u67E5\u672C\u5730\u5B58\u50A8\u4E2D\u7684\u8BED\u8A00\u8BBE\u7F6E
            const savedLang = localStorage.getItem('voicecraft-language');
            
            if (savedLang && translations[savedLang]) {
                currentLanguage = savedLang;
            } else {
                // \u81EA\u52A8\u68C0\u6D4B\u6D4F\u89C8\u5668\u8BED\u8A00
                currentLanguage = detectLanguage();
            }
            
            // \u5E94\u7528\u8BED\u8A00\u8BBE\u7F6E
            setLanguage(currentLanguage);
        }

        // \u521D\u59CB\u5316\u8BED\u8A00\u5207\u6362\u5668
        function initializeLanguageSwitcher() {
            const languageBtn = document.getElementById('languageBtn');
            const languageDropdown = document.getElementById('languageDropdown');

            // \u5207\u6362\u4E0B\u62C9\u83DC\u5355\u663E\u793A/\u9690\u85CF
            languageBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                languageDropdown.classList.toggle('show');
            });

            // \u70B9\u51FB\u9875\u9762\u5176\u4ED6\u5730\u65B9\u65F6\u9690\u85CF\u4E0B\u62C9\u83DC\u5355
            document.addEventListener('click', function() {
                languageDropdown.classList.remove('show');
            });

            // \u8BED\u8A00\u9009\u62E9
            document.querySelectorAll('.language-option').forEach(option => {
                option.addEventListener('click', function() {
                    const selectedLang = this.getAttribute('data-lang');
                    setLanguage(selectedLang);
                    languageDropdown.classList.remove('show');
                });
            });
        }
    <\/script>
</body>
</html>
`;
var index_default = {
  async fetch(request, env, ctx) {
    return handleRequest(request);
  }
};
async function handleRequest(request) {
  if (request.method === "OPTIONS") {
    return handleOptions(request);
  }
  const requestUrl = new URL(request.url);
  const path = requestUrl.pathname;
  if (path === "/" || path === "/index.html") {
    return new Response(HTML_PAGE, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        ...makeCORSHeaders()
      }
    });
  }
  if (path === "/v1/audio/transcriptions") {
    try {
      return await handleAudioTranscription(request);
    } catch (error) {
      console.error("Audio transcription error:", error);
      return new Response(JSON.stringify({
        error: {
          message: error.message,
          type: "api_error",
          param: null,
          code: "transcription_error"
        }
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
  }
  if (path === "/v1/audio/speech") {
    try {
      const contentType = request.headers.get("content-type") || "";
      if (contentType.includes("multipart/form-data")) {
        return await handleFileUpload(request);
      }
      const requestBody = await request.json();
      const {
        input,
        voice = "zh-CN-XiaoxiaoNeural",
        speed = "1.0",
        volume = "0",
        pitch = "0",
        style = "general"
      } = requestBody;
      let rate = parseInt(String((parseFloat(speed) - 1) * 100));
      let numVolume = parseInt(String(parseFloat(volume) * 100));
      let numPitch = parseInt(pitch);
      const response = await getVoice(
        input,
        voice,
        rate >= 0 ? `+${rate}%` : `${rate}%`,
        numPitch >= 0 ? `+${numPitch}Hz` : `${numPitch}Hz`,
        numVolume >= 0 ? `+${numVolume}%` : `${numVolume}%`,
        style,
        "audio-16khz-32kbitrate-mono-mp3"
      );
      return response;
    } catch (error) {
      console.error("Error:", error);
      return new Response(JSON.stringify({
        error: {
          message: error.message,
          type: "api_error",
          param: null,
          code: "edge_tts_error"
        }
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
  }
  return new Response("Not Found", { status: 404 });
}
__name(handleRequest, "handleRequest");
async function handleOptions(request) {
  return new Response(null, {
    status: 204,
    headers: {
      ...makeCORSHeaders(),
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers") || "Authorization"
    }
  });
}
__name(handleOptions, "handleOptions");
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
__name(delay, "delay");
function optimizedTextSplit(text, maxChunkSize = 1500) {
  const chunks = [];
  const sentences = text.split(/[。！？\n]/);
  let currentChunk = "";
  for (const sentence of sentences) {
    const trimmedSentence = sentence.trim();
    if (!trimmedSentence) continue;
    if (trimmedSentence.length > maxChunkSize) {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
        currentChunk = "";
      }
      for (let i = 0; i < trimmedSentence.length; i += maxChunkSize) {
        chunks.push(trimmedSentence.slice(i, i + maxChunkSize));
      }
    } else if ((currentChunk + trimmedSentence).length > maxChunkSize) {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
      }
      currentChunk = trimmedSentence;
    } else {
      currentChunk += (currentChunk ? "\u3002" : "") + trimmedSentence;
    }
  }
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  return chunks.filter((chunk) => chunk.length > 0);
}
__name(optimizedTextSplit, "optimizedTextSplit");
async function processBatchedAudioChunks(chunks, voiceName, rate, pitch, volume, style, outputFormat, batchSize = 3, delayMs = 1e3) {
  const audioChunks = [];
  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    const batchPromises = batch.map(async (chunk, index) => {
      try {
        if (index > 0) {
          await delay(index * 200);
        }
        return await getAudioChunk(chunk, voiceName, rate, pitch, volume, style, outputFormat);
      } catch (error) {
        console.error(`\u5904\u7406\u97F3\u9891\u5757\u5931\u8D25 (\u6279\u6B21 ${Math.floor(i / batchSize) + 1}, \u5757 ${index + 1}):`, error);
        throw error;
      }
    });
    try {
      const batchResults = await Promise.all(batchPromises);
      audioChunks.push(...batchResults);
      if (i + batchSize < chunks.length) {
        await delay(delayMs);
      }
    } catch (error) {
      console.error(`\u6279\u6B21\u5904\u7406\u5931\u8D25:`, error);
      throw error;
    }
  }
  return audioChunks;
}
__name(processBatchedAudioChunks, "processBatchedAudioChunks");
async function getVoice(text, voiceName = "zh-CN-XiaoxiaoNeural", rate = "+0%", pitch = "+0Hz", volume = "+0%", style = "general", outputFormat = "audio-16khz-32kbitrate-mono-mp3") {
  try {
    const cleanText = text.trim();
    if (!cleanText) {
      throw new Error("\u6587\u672C\u5185\u5BB9\u4E3A\u7A7A");
    }
    if (cleanText.length <= 1500) {
      const audioBlob = await getAudioChunk(cleanText, voiceName, rate, pitch, volume, style, outputFormat);
      return new Response(audioBlob, {
        headers: {
          "Content-Type": "audio/mpeg",
          ...makeCORSHeaders()
        }
      });
    }
    const chunks = optimizedTextSplit(cleanText, 1500);
    if (chunks.length > 40) {
      throw new Error(`\u6587\u672C\u8FC7\u957F\uFF0C\u5206\u5757\u6570\u91CF(${chunks.length})\u8D85\u8FC7\u9650\u5236\u3002\u8BF7\u7F29\u77ED\u6587\u672C\u6216\u5206\u6279\u5904\u7406\u3002`);
    }
    console.log(`\u6587\u672C\u5DF2\u5206\u4E3A ${chunks.length} \u4E2A\u5757\u8FDB\u884C\u5904\u7406`);
    const audioChunks = await processBatchedAudioChunks(
      chunks,
      voiceName,
      rate,
      pitch,
      volume,
      style,
      outputFormat,
      3,
      // 每批处理3个
      800
      // 批次间延迟800ms
    );
    const concatenatedAudio = new Blob(audioChunks, { type: "audio/mpeg" });
    return new Response(concatenatedAudio, {
      headers: {
        "Content-Type": "audio/mpeg",
        ...makeCORSHeaders()
      }
    });
  } catch (error) {
    console.error("\u8BED\u97F3\u5408\u6210\u5931\u8D25:", error);
    return new Response(JSON.stringify({
      error: {
        message: error.message || String(error),
        type: "api_error",
        param: `${voiceName}, ${rate}, ${pitch}, ${volume}, ${style}, ${outputFormat}`,
        code: "edge_tts_error"
      }
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...makeCORSHeaders()
      }
    });
  }
}
__name(getVoice, "getVoice");
async function getAudioChunk(text, voiceName, rate, pitch, volume, style, outputFormat = "audio-16khz-32kbitrate-mono-mp3", maxRetries = 3) {
  const retryDelay = 500;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const endpoint = await getEndpoint();
      const url = `https://${endpoint.r}.tts.speech.microsoft.com/cognitiveservices/v1`;
      let m = text.match(/\[(\d+)\]\s*?$/);
      let slien = 0;
      if (m && m.length == 2) {
        slien = parseInt(m[1]);
        text = text.replace(m[0], "");
      }
      if (!text.trim()) {
        throw new Error("\u6587\u672C\u5757\u4E3A\u7A7A");
      }
      if (text.length > 2e3) {
        throw new Error(`\u6587\u672C\u5757\u8FC7\u957F: ${text.length} \u5B57\u7B26\uFF0C\u6700\u5927\u652F\u63012000\u5B57\u7B26`);
      }
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": endpoint.t,
          "Content-Type": "application/ssml+xml",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0",
          "X-Microsoft-OutputFormat": outputFormat
        },
        body: getSsml(text, voiceName, rate, pitch, volume, style, slien)
      });
      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 429) {
          if (attempt < maxRetries) {
            console.log(`\u9891\u7387\u9650\u5236\uFF0C\u7B2C${attempt + 1}\u6B21\u91CD\u8BD5\uFF0C\u7B49\u5F85${retryDelay * (attempt + 1)}ms`);
            await delay(retryDelay * (attempt + 1));
            continue;
          }
          throw new Error(`\u8BF7\u6C42\u9891\u7387\u8FC7\u9AD8\uFF0C\u5DF2\u91CD\u8BD5${maxRetries}\u6B21\u4ECD\u5931\u8D25`);
        } else if (response.status >= 500) {
          if (attempt < maxRetries) {
            console.log(`\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u7B2C${attempt + 1}\u6B21\u91CD\u8BD5\uFF0C\u7B49\u5F85${retryDelay * (attempt + 1)}ms`);
            await delay(retryDelay * (attempt + 1));
            continue;
          }
          throw new Error(`Edge TTS\u670D\u52A1\u5668\u9519\u8BEF: ${response.status} ${errorText}`);
        } else {
          throw new Error(`Edge TTS API\u9519\u8BEF: ${response.status} ${errorText}`);
        }
      }
      return await response.blob();
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(`\u97F3\u9891\u751F\u6210\u5931\u8D25\uFF08\u5DF2\u91CD\u8BD5${maxRetries}\u6B21\uFF09: ${error.message}`);
      }
      if (error.message.includes("fetch") || error.message.includes("network")) {
        console.log(`\u7F51\u7EDC\u9519\u8BEF\uFF0C\u7B2C${attempt + 1}\u6B21\u91CD\u8BD5\uFF0C\u7B49\u5F85${retryDelay * (attempt + 1)}ms`);
        await delay(retryDelay * (attempt + 1));
        continue;
      }
      throw error;
    }
  }
}
__name(getAudioChunk, "getAudioChunk");
function escapeXmlText(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
__name(escapeXmlText, "escapeXmlText");
function getSsml(text, voiceName, rate, pitch, volume, style, slien = 0) {
  const escapedText = escapeXmlText(text);
  let slien_str = "";
  if (slien > 0) {
    slien_str = `<break time="${slien}ms" />`;
  }
  return `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" version="1.0" xml:lang="zh-CN"> 
                <voice name="${voiceName}"> 
                    <mstts:express-as style="${style}"  styledegree="2.0" role="default" > 
                        <prosody rate="${rate}" pitch="${pitch}" volume="${volume}">${escapedText}</prosody> 
                    </mstts:express-as> 
                    ${slien_str}
                </voice> 
            </speak>`;
}
__name(getSsml, "getSsml");
async function getEndpoint() {
  const now = Date.now() / 1e3;
  if (tokenInfo.token && tokenInfo.expiredAt && now < tokenInfo.expiredAt - TOKEN_REFRESH_BEFORE_EXPIRY) {
    return tokenInfo.endpoint;
  }
  const endpointUrl = "https://dev.microsofttranslator.com/apps/endpoint?api-version=1.0";
  const clientId = crypto.randomUUID().replace(/-/g, "");
  try {
    const response = await fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Accept-Language": "zh-Hans",
        "X-ClientVersion": "4.0.530a 5fe1dc6c",
        "X-UserId": "0f04d16a175c411e",
        "X-HomeGeographicRegion": "zh-Hans-CN",
        "X-ClientTraceId": clientId,
        "X-MT-Signature": await sign(endpointUrl),
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0",
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": "0",
        "Accept-Encoding": "gzip"
      }
    });
    if (!response.ok) {
      throw new Error(`\u83B7\u53D6endpoint\u5931\u8D25: ${response.status}`);
    }
    const data = await response.json();
    const jwt = data.t.split(".")[1];
    const decodedJwt = JSON.parse(atob(jwt));
    tokenInfo = {
      endpoint: data,
      token: data.t,
      expiredAt: decodedJwt.exp
    };
    return data;
  } catch (error) {
    console.error("\u83B7\u53D6endpoint\u5931\u8D25:", error);
    if (tokenInfo.token) {
      console.log("\u4F7F\u7528\u8FC7\u671F\u7684\u7F13\u5B58token");
      return tokenInfo.endpoint;
    }
    throw error;
  }
}
__name(getEndpoint, "getEndpoint");
function makeCORSHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-api-key",
    "Access-Control-Max-Age": "86400"
  };
}
__name(makeCORSHeaders, "makeCORSHeaders");
async function hmacSha256(key, data) {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, new TextEncoder().encode(data));
  return new Uint8Array(signature);
}
__name(hmacSha256, "hmacSha256");
async function base64ToBytes(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
__name(base64ToBytes, "base64ToBytes");
async function bytesToBase64(bytes) {
  return btoa(String.fromCharCode.apply(null, bytes));
}
__name(bytesToBase64, "bytesToBase64");
function uuid() {
  return crypto.randomUUID().replace(/-/g, "");
}
__name(uuid, "uuid");
async function sign(urlStr) {
  const url = urlStr.split("://")[1];
  const encodedUrl = encodeURIComponent(url);
  const uuidStr = uuid();
  const formattedDate = dateFormat();
  const bytesToSign = `MSTranslatorAndroidApp${encodedUrl}${formattedDate}${uuidStr}`.toLowerCase();
  const decode = await base64ToBytes("oik6PdDdMnOXemTbwvMn9de/h9lFnfBaCWbGMMZqqoSaQaqUOqjVGm5NqsmjcBI1x+sS9ugjB55HEJWRiFXYFw==");
  const signData = await hmacSha256(decode, bytesToSign);
  const signBase64 = await bytesToBase64(signData);
  return `MSTranslatorAndroidApp::${signBase64}::${formattedDate}::${uuidStr}`;
}
__name(sign, "sign");
function dateFormat() {
  const formattedDate = (/* @__PURE__ */ new Date()).toUTCString().replace(/GMT/, "").trim() + " GMT";
  return formattedDate.toLowerCase();
}
__name(dateFormat, "dateFormat");
async function handleFileUpload(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const voice = formData.get("voice") || "zh-CN-XiaoxiaoNeural";
    const speed = formData.get("speed") || "1.0";
    const volume = formData.get("volume") || "0";
    const pitch = formData.get("pitch") || "0";
    const style = formData.get("style") || "general";
    if (!file) {
      return new Response(JSON.stringify({
        error: {
          message: "\u672A\u627E\u5230\u4E0A\u4F20\u7684\u6587\u4EF6",
          type: "invalid_request_error",
          param: "file",
          code: "missing_file"
        }
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
    if (!file.type.includes("text/") && !file.name.toLowerCase().endsWith(".txt")) {
      return new Response(JSON.stringify({
        error: {
          message: "\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B\uFF0C\u8BF7\u4E0A\u4F20txt\u6587\u4EF6",
          type: "invalid_request_error",
          param: "file",
          code: "invalid_file_type"
        }
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
    if (file.size > 500 * 1024) {
      return new Response(JSON.stringify({
        error: {
          message: "\u6587\u4EF6\u5927\u5C0F\u8D85\u8FC7\u9650\u5236\uFF08\u6700\u5927500KB\uFF09",
          type: "invalid_request_error",
          param: "file",
          code: "file_too_large"
        }
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
    const text = await file.text();
    if (!text.trim()) {
      return new Response(JSON.stringify({
        error: {
          message: "\u6587\u4EF6\u5185\u5BB9\u4E3A\u7A7A",
          type: "invalid_request_error",
          param: "file",
          code: "empty_file"
        }
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
    if (text.length > 1e4) {
      return new Response(JSON.stringify({
        error: {
          message: "\u6587\u672C\u5185\u5BB9\u8FC7\u957F\uFF08\u6700\u592710000\u5B57\u7B26\uFF09",
          type: "invalid_request_error",
          param: "file",
          code: "text_too_long"
        }
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
    let rate = parseInt(String((parseFloat(speed) - 1) * 100));
    let numVolume = parseInt(String(parseFloat(volume) * 100));
    let numPitch = parseInt(pitch);
    return await getVoice(
      text,
      voice,
      rate >= 0 ? `+${rate}%` : `${rate}%`,
      numPitch >= 0 ? `+${numPitch}Hz` : `${numPitch}Hz`,
      numVolume >= 0 ? `+${numVolume}%` : `${numVolume}%`,
      style,
      "audio-16khz-32kbitrate-mono-mp3"
    );
  } catch (error) {
    console.error("\u6587\u4EF6\u4E0A\u4F20\u5904\u7406\u5931\u8D25:", error);
    return new Response(JSON.stringify({
      error: {
        message: "\u6587\u4EF6\u5904\u7406\u5931\u8D25",
        type: "api_error",
        param: null,
        code: "file_processing_error"
      }
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...makeCORSHeaders()
      }
    });
  }
}
__name(handleFileUpload, "handleFileUpload");
async function handleAudioTranscription(request) {
  try {
    if (request.method !== "POST") {
      return new Response(JSON.stringify({
        error: {
          message: "\u53EA\u652F\u6301POST\u65B9\u6CD5",
          type: "invalid_request_error",
          param: "method",
          code: "method_not_allowed"
        }
      }), {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return new Response(JSON.stringify({
        error: {
          message: "\u8BF7\u6C42\u5FC5\u987B\u4F7F\u7528multipart/form-data\u683C\u5F0F",
          type: "invalid_request_error",
          param: "content-type",
          code: "invalid_content_type"
        }
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
    const formData = await request.formData();
    const audioFile = formData.get("file");
    const customToken = formData.get("token");
    if (!audioFile) {
      return new Response(JSON.stringify({
        error: {
          message: "\u672A\u627E\u5230\u97F3\u9891\u6587\u4EF6",
          type: "invalid_request_error",
          param: "file",
          code: "missing_file"
        }
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
    if (audioFile.size > 10 * 1024 * 1024) {
      return new Response(JSON.stringify({
        error: {
          message: "\u97F3\u9891\u6587\u4EF6\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC710MB",
          type: "invalid_request_error",
          param: "file",
          code: "file_too_large"
        }
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
    const allowedTypes = [
      "audio/mpeg",
      "audio/mp3",
      "audio/wav",
      "audio/m4a",
      "audio/flac",
      "audio/aac",
      "audio/ogg",
      "audio/webm",
      "audio/amr",
      "audio/3gpp"
    ];
    const isValidType = allowedTypes.some(
      (type) => audioFile.type.includes(type) || audioFile.name.toLowerCase().match(/\.(mp3|wav|m4a|flac|aac|ogg|webm|amr|3gp)$/i)
    );
    if (!isValidType) {
      return new Response(JSON.stringify({
        error: {
          message: "\u4E0D\u652F\u6301\u7684\u97F3\u9891\u6587\u4EF6\u683C\u5F0F\uFF0C\u8BF7\u4E0A\u4F20mp3\u3001wav\u3001m4a\u3001flac\u3001aac\u3001ogg\u3001webm\u3001amr\u62163gp\u683C\u5F0F\u7684\u6587\u4EF6",
          type: "invalid_request_error",
          param: "file",
          code: "invalid_file_type"
        }
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
    const token = customToken || "sk-wtldsvuprmwltxpbspbmawtolbacghzawnjhtlzlnujjkfhh";
    const apiFormData = new FormData();
    apiFormData.append("file", audioFile);
    apiFormData.append("model", "FunAudioLLM/SenseVoiceSmall");
    const apiResponse = await fetch("https://api.siliconflow.cn/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: apiFormData
    });
    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error("\u7845\u57FA\u6D41\u52A8API\u9519\u8BEF:", apiResponse.status, errorText);
      let errorMessage = "\u8BED\u97F3\u8F6C\u5F55\u670D\u52A1\u6682\u65F6\u4E0D\u53EF\u7528";
      if (apiResponse.status === 401) {
        errorMessage = "API Token\u65E0\u6548\uFF0C\u8BF7\u68C0\u67E5\u60A8\u7684\u914D\u7F6E";
      } else if (apiResponse.status === 429) {
        errorMessage = "\u8BF7\u6C42\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5";
      } else if (apiResponse.status === 413) {
        errorMessage = "\u97F3\u9891\u6587\u4EF6\u592A\u5927\uFF0C\u8BF7\u9009\u62E9\u8F83\u5C0F\u7684\u6587\u4EF6";
      }
      return new Response(JSON.stringify({
        error: {
          message: errorMessage,
          type: "api_error",
          param: null,
          code: "transcription_api_error"
        }
      }), {
        status: apiResponse.status,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
    const transcriptionResult = await apiResponse.json();
    return new Response(JSON.stringify(transcriptionResult), {
      headers: {
        "Content-Type": "application/json",
        ...makeCORSHeaders()
      }
    });
  } catch (error) {
    console.error("\u8BED\u97F3\u8F6C\u5F55\u5904\u7406\u5931\u8D25:", error);
    return new Response(JSON.stringify({
      error: {
        message: "\u8BED\u97F3\u8F6C\u5F55\u5904\u7406\u5931\u8D25",
        type: "api_error",
        param: null,
        code: "transcription_processing_error"
      }
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...makeCORSHeaders()
      }
    });
  }
}
__name(handleAudioTranscription, "handleAudioTranscription");
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
