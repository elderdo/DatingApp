.changes on
.print 'Starting cleanup...'


DELETE FROM Users WHERE  NOT Id LIKE '%-id';

-- 2. Create a temporary trigger to enforce your condition
-- Example condition: Abort if we accidentally deleted ALL users (table is now empty)
CREATE TEMP TRIGGER validate_cleanup
BEFORE INSERT ON sqlite_schema -- Triggers on a dummy action
WHEN (SELECT COUNT(*) FROM users) > 3
BEGIN
    SELECT RAISE(ABORT, 'Safety check failed: Cannot delete all users!');
END;

COMMIT;
.print 'Cleanup finished' 