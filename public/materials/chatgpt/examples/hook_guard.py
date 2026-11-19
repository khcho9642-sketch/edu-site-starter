"""교육용 Codex apply_patch 훅 입력 검사. 파일/설정을 직접 변경하지 않는다."""
import json,re,sys

def inspect(event):
    if not isinstance(event,dict) or event.get('tool_name')!='apply_patch':return False
    tool_input=event.get('tool_input')
    if not isinstance(tool_input,dict):return False
    patch=tool_input.get('command')
    if not isinstance(patch,str):return False
    patch=patch.replace('\r\n','\n')
    if not patch.startswith('*** Begin Patch\n') or not patch.rstrip().endswith('*** End Patch'):return False
    headers=re.findall(r'^\*\*\* (?:Add File|Update File|Delete File|Move to): (.+)$',patch,re.M)
    if not headers:return False
    return all(path.strip().replace('\\','/').rsplit('/',1)[-1].casefold()!='protected-demo.md' for path in headers)

def response(allowed):
    body={'hookEventName':'PreToolUse'}
    if not allowed:body.update(permissionDecision='deny',permissionDecisionReason='교육용 패치 검사에서 거절했습니다. 다른 수정 수단으로 우회하지 마세요.')
    return {'hookSpecificOutput':body}

if __name__=='__main__':
    try:allowed=inspect(json.load(sys.stdin))
    except (ValueError,TypeError):allowed=False
    # An exit code of zero does not mean allow: the hook decision is in JSON.
    print(json.dumps(response(allowed),ensure_ascii=True))
